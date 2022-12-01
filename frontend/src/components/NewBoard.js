import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createBoard } from "../slices/boards";
import { useDispatch, useSelector } from "react-redux";

const NewBoard = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const initialValues = {
    boardName: "",
  };

  // const userId = useSelector((state) => state.userCredentials.userId);
  // const boardId = useSelector((state) => state.boards.lastBoardId);

  const validationSchema = Yup.object().shape({
    boardName: Yup.string().required("Podaj nazwę stołu."),
  });

  const handleCreateBoard = (formValue) => {
    const { boardName } = formValue;
    setLoading(true);
    // dispatch(createBoard( boardName ))
    dispatch(createBoard())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
                <Field id="cb1" type="checkbox" name="checked" value="ranked" />
                Gra rankingowa
              </label>
            </div>
            <div className="new-board-checkbox">
              <label>
                <Field id="cb1" type="checkbox" name="checked" value="public" />
                Stół publiczny
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
