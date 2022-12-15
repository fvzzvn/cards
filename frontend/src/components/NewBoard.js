import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createBoard } from "../slices/boards";
import { useDispatch, useSelector } from "react-redux";

const NewBoard = (props) => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const initialValues = {
    boardName: "",
    boardType: "0",
    boardMode: "0",
    boardPublic: "0",
  };

  const validationSchema = Yup.object().shape({
    boardName: Yup.string().required("Podaj nazwę stołu."),
  });

  const handleCreateBoard = async (formValue) => {
    const { boardName, boardType, boardMode, boardPublic } = formValue;
    setLoading(true);
    const args = { boardName, boardType, boardMode, boardPublic };
    console.log(args);
    dispatch(createBoard(args))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    try {
      await props.connection.invoke("RefreshPage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="new-board-box">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateBoard}
        >
          <Form>
            <div className="form-group new-board-box-name">
              <Field
                name="boardName"
                placeholder="Nazwa stołu"
                type="text"
                className="form-control"
              />
            </div>
            <div className="new-board-checkbox">
              <label>
                <Field id="cb1" type="checkbox" name="boardType" value="0" />
                Gra rankingowa
              </label>
            </div>
            <div className="new-board-checkbox">
              <label>
                <Field id="cb1" type="checkbox" name="boardPublic" value="0" />
                Stół publiczny
              </label>
            </div>
            <div className="gamemode-title">Tryb gry</div>
            <div className="new-board-radio">
              <label>
                <Field id="cb1" type="radio" name="boardMode" value="0" />
                Rat
              </label>
              <label>
                <Field id="cb1" type="radio" name="boardMode" value="1" />
                Dragon
              </label>
            </div>
            <div className="new-board-box-button-wrapper">
              <button
                type="submit"
                className="btn btn-secondary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                {!loading && <span>Stwórz stół</span>}
              </button>
            </div>
            <ErrorMessage
              name="boardName"
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
    </>
  );
};

export default NewBoard;
