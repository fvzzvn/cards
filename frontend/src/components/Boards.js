import React, { useState, useEffect } from "react";
import Board from "./Board.js";
import { clearMessage } from "../slices/message";
import { getBoards } from "../slices/boards";
import { useDispatch, useSelector } from "react-redux";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";


const Boards = (props) => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const { boards } = useSelector((state) => state.boards);
  const [connection, setConnection] = useState(null);


  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getBoards())
      .unwrap()
      .then(() => {
      })
      .catch(() => {
      });

      const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7297/BoardHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connection);
    if (connection) {
      connection.start().then((result) => {
        console.log("SignalR Connected!");
      });
    }

    connection.on("refreshBoards", () => {
      console.log("refreshBoards");
      dispatch(getBoards());
    })
    
  }, [dispatch]);

  return (
    <>
      {true ? (
        boards.map((item, i) => (
          <div onClick={(e) => props.handleGo(item.boardId, e)}>
            <Board
              // id={item.id}
              key={i}
              id={item.boardId}
              boardName={item.boardName}
              boardMode={item.boardMode}
              boardType={item.boardType}
              players={item.players}
            ></Board>
          </div>
        ))
      ) : (
        <span className="board-loader spinner-border spinner-border-sm"></span>
      )}
      {/* {[45, 92, 111, 112, 166, 201, 222, 295, 300, 397].map((e, i) => (
          <Board
            id={e}
            key={i}
            participants={['username23','player606','cards102']}
          ></Board>
        ))
        } */}
    </>
  );
};

export default Boards;
