import React, { useState, useEffect } from "react";
import Board from "./Board.js";

const Boards = (props) => {
  return (
    <>
      {!props.loading ? (
        props.boards.map((item, i) => (
          <div onClick={(e) => props.handleGo(item.boardId, e)}>
            <Board
              // id={item.id}
              id={item.boardId}
              key={i}
              // ranking={props.mmrs[i]}
              // participants={props.participants[i]}
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
