import React, { useState, useEffect } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import HeaderBar from "./HeaderBar";
import Button from "react-bootstrap/Button";

const Game = (props) => {
  const [handCards, setHandCards] = useState("");
  const [connection, setConnection] = useState(null);

  const invokeJoinRoom = async (connection) => {
    console.log("invoking JoinRoom through", connection);
    await connection.invoke("JoinRoom", "5", "aaa@aaa.com");
  };


  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7297/GameHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connection);

    connection.on("playerJoined", player => {
        console.log(player, "joined");
    });

    connection.on("start", game => {
        console.log(game, "started");
    });

    connection.on("playerPlayedCard", (player, card, game) => {
        console.log(player, "played", card, "game:", game);
    });

    connection.on("playerTookCard", (player, card, game) => {
        console.log(player, "took", card, "game:", game);
    });

    connection.on("stackEmpty", () => {
        console.log("stack empty");
    });

    connection.on("gameEnding", () => {
        console.log("game ending");
    });


  }, []);

  useEffect(() => {
    if (connection) {
      connection.start().then((result) => {
        console.log("SignalR Connected!");

        invokeJoinRoom(connection).catch(console.error);

      });
    }
  }, [connection]);

  const handlePlayCard = async (card) => {
    card = 0;
    try {
      await connection.invoke("PlayCard", card);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlayCardAfterGet = async (card) => {
    try {
      await connection.invoke("PlayCardAfterGet", card);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetCardDealer = async () => {
    try {
      await connection.invoke("GetCard", "dealer");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetCardStack = async () => {
    try {
      await connection.invoke("GetCard", "stack");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndGame = async () => {
    const player = 1;
    try {
      await connection.invoke("EndGame", player);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="game-component">
      <HeaderBar></HeaderBar>
      <div className="game-wrapper">
        <div className="game-container">
          <div className="game-table">
            <Button variant="secondary" onClick={handlePlayCard}>
              playCard
            </Button>
            <Button variant="secondary" onClick={handlePlayCardAfterGet}>
              PlayCardAfterGet
            </Button>
            <Button variant="secondary" onClick={handleGetCardDealer}>
              GetCardDealer
            </Button>
            <Button variant="secondary" onClick={handleGetCardStack}>
              GetCardStack
            </Button>
            <Button variant="secondary" onClick={handleEndGame}>
              EndGame
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
