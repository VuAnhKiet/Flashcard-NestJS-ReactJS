import React from 'react' // eslint-disable-line no-unused-vars
import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
function EditSetCards({ name, id, hide, setHide, setName, edit }) {
    const initialValues = {
        name: name
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("You must input a name"),
    });

    const onSubmit = async (data, { resetForm }) => {
        const response = await edit(data, id);
        setName(response);
        setHide(!hide);
        toast.success("Edit success!")
        resetForm();
    };

    return (
        <div className="edit-card">
            <div className="new-card">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <label>Edit: </label>
                        <ErrorMessage name="name" component="span" />

                        <Field
                            autoComplete="off"
                            id="input"
                            name="name"
                        />

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setHide(!hide);
                            }}
                        >
                            Close
                        </button>

                        <button className="save" type="submit">
                            Save
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default EditSetCards