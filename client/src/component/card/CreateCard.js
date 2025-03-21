import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../AuthContext';
import { useCards } from "../../hooks/useCards";
import CardById from "./CardsById";
import Modal from "../modal/Modal";
import SearchCard from "./SearchCard";


function CreateCard() {
    const { auth } = useAuth();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    let { id } = useParams();
    const { listOfCards, message, addCard, removeCard, searchCards, checkQuery } = useCards(id, auth);

    const initialValues = {
        word: "",
        definition: "",
    };

    const validationSchema = Yup.object().shape({
        word: Yup.string().min(3).max(15).required("You must input a word"),
        definition: Yup.string().min(3).max(15).required("You must input a definition"),
    });

    const delCard = (e, id) => {
        e.stopPropagation();
        setCardToDelete(id);
        setIsOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (cardToDelete) {
            await removeCard(cardToDelete);
            setCardToDelete(null);
        }
        setIsOpen(false);
    };

    const handleCancelDelete = () => {
        setCardToDelete(null);
        setIsOpen(false);
    };

    const edit = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

    }

    const onSubmit = async (data, { resetForm }) => {
        await addCard({ ...data, groupCardId: id });
        resetForm();
    };

    const Search = async (e) => {
        e.preventDefault();
        await searchCards(query);
    };

    const checkValue = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (!value) {
            checkQuery();
        }
    }

    const cardProps = {
        listOfCards: listOfCards,
        del: delCard,
        edit: edit,
    }

    const searchProps = {
        query: query,
        checkValue: checkValue,
        Search: Search
    }

    return (
        <div className="form-and-card search-create-form">
            <Modal
                isOpen={isOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <div className="">
            {auth ? (
                <SearchCard searchProps={searchProps} />) : (<div />)
            }
            <div className="form-card create-form">
                <h2 className="form-title" >Create Flashcards</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnBlur={false}  
                    validateOnChange={false}    
                >{({ handleChange, setFieldValue }) => (
                    <Form id="create-set-form">
                        <label htmlFor="set-name" className="form-label" >Word:
                        <ErrorMessage name="word" component="span" id="errormsg" />
                        </label>
                        <Field
                            autoComplete="off"
                            id="input"
                            name="word"
                            className="form-input"
                            placeHolder='Enter a word...'
                            onChange={e => setFieldValue('word', e.target.value)}
                        />
                        <label htmlFor="set-name" className="form-label">Definition:
                        <ErrorMessage name="definition" component="span" id="errormsg" />
                        </label>
                        <Field
                            autoComplete="off"
                            id="input"
                            name="definition"
                            className="form-input"
                            placeHolder='Enter a definition...'
                            onChange={(e) => { setFieldValue("definition", e.target.value); }}
                        />
                        <button className="form-btn" type="submit">Create</button>
                    </Form>)}
                </Formik>
            </div>
            </div>
            <div>
                <CardById cardProps={cardProps} />
                {message && <div className="no-result">{message}</div>}
            </div>
        </div>
    );
}

export default CreateCard;