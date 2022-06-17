import React, { useState, useEffect } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import HeaderBar from "./HeaderBar";
import Button from "react-bootstrap/Button";
import Card from "./Card";

const Game = (props) => {
  const [handCards, setHandCards] = useState("");
  const [leftPlayerCards, setLeftCards] = useState("");
  const [rightPlayerCards, setRightCards] = useState("");
  const [topPlayerCards, setTopCards] = useState("");
  const [stackCards, setStackCards] = useState("");
  const [gameState, setGameState] = useState("");
  const [activeCard, setActiveCard] = useState("");
  const [connection, setConnection] = useState(null);

  const invokeJoinRoom = async (connection) => {
    console.log("invoking JoinRoom through", connection);
    await connection.invoke("JoinRoom", "108", `${props.username}`);
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

    connection.on("playerJoined", (player) => {
      console.log(player, "joined");
    });

    connection.on("start", (game) => {
      setGameState(game);
      setHandCards(game.player1.cards);
      setLeftCards(game.player2.cards);
      setTopCards(game.player3.cards);
      setRightCards(game.player4.cards);
      setStackCards(game.stack.cards);
      setActiveCard(game.player1.cards[0]);
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

  const handlePlayCard = async () => {
    console.log("playing", activeCard);
    try {
      await connection.invoke("PlayCard", activeCard);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlayCardAfterGet = async () => {
    try {
      await connection.invoke("PlayCardAfterGet", activeCard);
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
      <HeaderBar username={props.username}></HeaderBar>
      <div className="game-wrapper">
        <div className="game-container">
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

          <div className="game-table">
            <div className="game-grid">
              <div className="left-player">
                {leftPlayerCards &&
                  leftPlayerCards.map((card, i) => (
                    <div
                      onClick={() =>
                        setActiveCard({
                          text: card.text,
                          suit: card.suit,
                          isSpecial: card.isSpecial,
                        })
                      }
                    >
                      <Card value={card.text} suit={card.suit} key={i}></Card>
                    </div>
                  ))}
              </div>
              <div className="top-player">
                {topPlayerCards &&
                  topPlayerCards.map((card, i) => (
                    <div
                      onClick={() =>
                        setActiveCard({
                          text: card.text,
                          suit: card.suit,
                          isSpecial: card.isSpecial,
                        })
                      }
                    >
                      <Card value={card.text} suit={card.suit} key={i}></Card>
                    </div>
                  ))}
              </div>
              <div className="center-stack">
                {stackCards && (
                  <Card
                    value={stackCards.at(-1).card.text}
                    suit={stackCards.at(-1).card.suit}
                  ></Card>
                )}
              </div>
              <div className="right-player">
                {rightPlayerCards &&
                  rightPlayerCards.map((card, i) => (
                    <div
                      onClick={() =>
                        setActiveCard({
                          text: card.text,
                          suit: card.suit,
                          isSpecial: card.isSpecial,
                        })
                      }
                    >
                      <Card value={card.text} suit={card.suit} key={i}></Card>
                    </div>
                  ))}
              </div>
              <div className="bottom-player">
                {handCards &&
                  handCards.map((card, i) => (
                    <div
                      onClick={() =>
                        setActiveCard({
                          text: card.text,
                          suit: card.suit,
                          isSpecial: card.isSpecial,
                        })
                      }
                    >
                      <Card value={card.text} suit={card.suit} key={i}></Card>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
