import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";
import Button from "react-bootstrap/Button";

const Register = (props) => {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Nazwa użytkownika musi mieć od 3 do 20 znaków.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("Podaj nazwę użytkownika."),
    email: Yup.string()
      .email("Ten adres e-mail nie jest poprawny.")
      .required("Wpisz adres e-mail."),
    password: Yup.string()
      .test(
        "len",
        "Hasło może mieć od 6 do 40 znaków.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("To pole jest wymagane."),
      password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać')
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;
    setSuccessful(false);
    console.log(email);
    console.log(password);
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  if (props.showRegister) {
    return (
      <div>
        <div className="formik-div">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <h4 className="h4-title">Rejestracja</h4>
                  <div className="form-group">
                    <Field
                      name="username"
                      placeholder="Nazwa użytkownika"
                      type="text"
                      className="form-control"
                    />
                  </div>
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
                      placeholder="Hasło"
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="password2"
                      placeholder="Powtórz hasło"
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <Button type="submit" variant="secondary">
                      Utwórz nowe konto
                    </Button>
                  </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
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
                    <ErrorMessage
                      name="password2"
                      component="div"
                      className="alert alert-danger"
                    />
                </div>
              )}
            </Form>
          </Formik>
        </div>
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Register;
