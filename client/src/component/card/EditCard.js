import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as Yup from "yup";
import { updateCard } from "../../services/cardService";
import { toast } from 'react-toastify';

function EditCard({ cardId, word, setword, definition, setdef, state, setState }) {

    const initialValues = {
        word: word,
        definition: definition,
    };

    const validationSchema = Yup.object().shape({
        word: Yup.string().required("You must input a word"),
        definition: Yup.string().min(3).max(15).required("You must input a definition"),
    });

    const onSubmit = async (data, { resetForm }) => {
        try {
            const info = { word: data.word, definition: data.definition, id: cardId };
            const updateCards = await updateCard(info);

            if (updateCards.error) {
                alert("Please login to continue!");
            } else {
                setdef(data.definition);
                setword(data.word);
                toast.success("Edit success!")
                setState(!state);
            }
        } catch (error) {
            toast.error("Error updating card:", error);
        }
        resetForm();
    };
    return (
        <div className="edit-card" onClick={(e) => { e.stopPropagation(); }}>
            <div className="new-card">

                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}

                >{({ handleChange, setFieldValue }) => (
                    <Form>
                        <label>Word: </label>
                        <ErrorMessage name="word" component="span" />
                        <Field
                            autoComplete="off"
                            id="input"
                            name="word"
                            onChange={e => setFieldValue('word', e.target.value)}
                        />
                        <label>Definition: </label>
                        <ErrorMessage name="definition" component="span" />
                        <Field
                            autoComplete="off"
                            id="input"
                            name="definition"
                            onChange={(e) => { setFieldValue("definition", e.target.value); }}
                        />
                        <button type="button" onClick={(e) => { e.stopPropagation(); setState(!state); }}>Close</button>
                        <button className="save" type="submit" >Save</button>
                    </Form>)}
                </Formik>
            </div>
        </div>
    )
}

export default EditCard