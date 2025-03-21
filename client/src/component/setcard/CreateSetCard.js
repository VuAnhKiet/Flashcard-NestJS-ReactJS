import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Components
import SetCardList from "./SetCardList.js";
import ShareSection from "../share-section/ShareSection.js";
import Modal from "../modal/Modal.js";
import SetCardSearch from "./SearchSetCard.js";
import FriendProfile from "../friends/FriendProfile.js";

// Context
import { useAuth } from "../../AuthContext.js";

// Custom Hooks
import { useSetCard } from "../../hooks/useSetCards.js";
import { useShare } from "../../hooks/useShareCards.js";

function CreateSetCard({share}) {
  const { auth } = useAuth();
  const [query, setQuery] = useState("");
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    cardstheme,
    message,
    addSetCard,
    removeSetCard,
    findSetCard,
    checkQuery,
    editSetCard,
  } = useSetCard(auth);

  const {
    addShareCard,
    removeShareCard,
    shareBox,
    setShareBox,
    setDraggedCard,
  } = useShare(auth);

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(20).required("You must input a name"),
  });

  const onSubmit = async (data, { resetForm }) => {
    const response = await addSetCard(data);
    if(response.error){
      toast.error("Please login to continue!");
    }
    resetForm();
  };

  const Search = async (e) => {
    e.preventDefault();
    await findSetCard(query);
  };

  //check if query is null then return all setcard
  const checkValue = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      checkQuery();
    }
  };

  const dragStart = (card) => {
    setDraggedCard(card);
  };

  const drop = async () => {
    await addShareCard();
  };

  const delShareCard = async (card) => {
    await removeShareCard(card);
  };

  const del = async (e, id) => {
    e.stopPropagation();
    setCardToDelete(id);
    setIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (cardToDelete) {
      await removeSetCard(cardToDelete);
      setCardToDelete(null);
    }
    setIsOpen(false);
  };

  const handleCancelDelete = () => {
    setCardToDelete(null);
    setIsOpen(false);
  };

  const setcardProps = {
    cardstheme: cardstheme,
    del: del,
    auth: auth,
    drag: dragStart,
    edit: editSetCard,
  };

  const shareProps = {
    drop: drop,
    delShareCard: delShareCard,
    shareBox: shareBox,
    setShareBox: setShareBox,
  };

  const searchProps = {
    query: query,
    checkValue: checkValue,
    Search: Search,
  };

  return (
    <div className="">
      <FriendProfile share={share} />
      {auth ? <ShareSection shareProps={shareProps} /> : <div />}
      
      <Modal
        isOpen={isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <div className="form-and-cards">
        {auth ? <SetCardSearch searchProps={searchProps} /> : <div />}
        <div className="form-card">
        <h2 className="form-title">✨ Create Your Set ✨</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}  
          validateOnChange={false}  
        >
          <Form id="create-set-form">   
            <label htmlFor="set-name" className="form-label">Set name: 
              <ErrorMessage name="name" component="span" id="errormsg" />
            </label>    
            <Field 
            autoComplete="off" 
            id="set-name" 
            name="name" 
            className="form-input" 
            placeholder="Enter a name for your set"
            />
            <button className="form-btn" type="submit">
              Create
            </button>
          </Form>
        </Formik>
      </div>
      {message && <div className="no-result">{message}</div>}
      <SetCardList setcardProps={setcardProps} />
      </div>
    </div>
  );
}

export default CreateSetCard;
