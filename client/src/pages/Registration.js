import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function Registration() {
  const { Register } = useUser();
  const navigate = useNavigate();

  const initialValues = {
    fullname: '',
    password: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('You must input a name'),
    password: Yup.string().min(8).required('You must input a password'),
    email: Yup.string().required('You must input an email'),
  });

  const onSubmit = async (data, { resetForm }) => {
    const response = await Register(data);
    if (response.error) {
      toast.error(response.error);
      console.log(response.error);
    } else {
      toast.success("Registration successful!");
      resetForm();
      navigate('/login');
    }
  };

  return (
    <div className="regist-body">
      <div className="regist-main">
        <h1 className="regist-title">REGISTER</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnBlur={false}  
          validateOnChange={false}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="input-group">
              <label className="reglabel">Username:
              <ErrorMessage name="fullname" component="span" className="error-message" />
              </label>
              <Field
                autoComplete="off"
                id="input"
                name="fullname"
                className="input"
                placeholder="Username"
              />
            </div>

            <div className="input-group">
              <label className="reglabel">Password:
              <ErrorMessage name="password" component="span" className="error-message" />
              </label>
              <Field
                autoComplete="off"
                id="input"
                type="password"
                name="password"
                className="input"
                placeholder="New password"
              />
            </div>

            <div className="input-group">
              <label className="reglabel">Email:
              <ErrorMessage name="email" component="span" className="error-message" />
              </label>
              <Field
                autoComplete="off"
                type="email"
                id="input"
                name="email"
                className="input"
                placeholder="Email address"
              />
            </div>

            <div className="wrap">
              <button className="button" type="submit">
                Register
              </button>
            </div>
          </Form>
        </Formik>

        <p>
          Already have an account?{' '}
          <Link className="register-link" to="/login">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
