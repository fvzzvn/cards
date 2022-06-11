import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

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
    console.log(email);
    console.log(password);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    console.log("LOGGED IN");
  }
  if (props.showLogin) {
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
  }
};

export default Login;
