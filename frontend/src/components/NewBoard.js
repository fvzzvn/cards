import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createBoard, dontGo } from "../slices/boards";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

const NewBoard = (props) => {
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState(null);
  const { message } = useSelector((state) => state.message);
  const nowGo = useSelector((state) => state.boards.nowGo);
  const createdBoardId = useSelector((state) => state.boards.createdBoardId);
  const dispatch = useDispatch();
  const handleGo = props.handleGo;

  const initialValues = {
    boardName: "",
    boardType: false,
    boardMode: "0",
    boardPublic: false,
  };

  const validationSchema = Yup.object().shape({
    boardName: Yup.string().required("Podaj nazwę stołu."),
  });

  const handleCreateBoard = (formValue) => {
    let { boardName, boardType, boardMode, boardPublic } = formValue;
    if (boardType === false) {
      boardType = 1;
    } else if (boardType === true) {
      boardType = 2;
    }
    if (boardMode === "0") {
      boardMode = 1;
    } else if (boardMode === "1") {
      boardMode = 2;
    } else if (boardMode === "2") {
      boardMode = 3;
    }

    setLoading(true);
    dispatch(createBoard({ boardName, boardType, boardMode, boardPublic }))
      .unwrap()
      .then(() => {
        console.log();
        setLoading(false);
        dispatch(clearMessage());
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7297/BoardHub", {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
          })
          .withAutomaticReconnect()
          .configureLogging(LogLevel.Information)
          .build();

        setConnection(connection);

        connection.on("refreshBoards", () => {});

        if (connection) {
          connection.start().then(() => {
            connection.invoke("RefreshPage");
          });
        }
      })
      .catch(() => {});
      
  };

  useEffect(() => {
    if (nowGo) {
      handleGo(createdBoardId);
    }
    dispatch(dontGo());
  }, [nowGo])


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
                <Field id="cb1" type="checkbox" name="boardType" />
                Gra rankingowa
              </label>
            </div>
            <div className="new-board-checkbox">
              <label>
                <Field id="cb1" type="checkbox" name="boardPublic" />
                Stół publiczny
              </label>
            </div>
            <div className="gamemode-title">Tryb gry</div>
            <div className="new-board-radio">
              <label>
                <Field id="cb1" type="radio" name="boardMode" value="0" />
                Szczury
              </label>
              <label>
                <Field id="cb1" type="radio" name="boardMode" value="1" />
                Smoki
              </label>
              <label>
                <Field id="cb1" type="radio" name="boardMode" value="2" />
                Kruki
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
