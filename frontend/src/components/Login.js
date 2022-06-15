import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import userService from "../services/user.service";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch])

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ten adres e-mail nie jest poprawny.")
      .required("Wpisz adres e-mail."),
    password: Yup.string().required("Wpisz hasło."),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

    return (
      <div>
        <div className="login-title">
          <h4 className="h4-title">Logowanie</h4>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <Field
                  name="email"
                  placeholder="Adres e-mail"
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <Field
                  name="password"
                  type="password"
                  placeholder="Hasło"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  {!loading && <span>Zaloguj się</span>}
                </button>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </Form>
          </Formik>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    );
  };

export default Login;
