import React, { useState, useEffect } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import HeaderBar from "./HeaderBar";
import Button from "react-bootstrap/Button";
import Card from "./Card";
import { v4 as uuid } from "uuid";
import { addParticipant } from "../slices/participants";
import { useDispatch, useSelector } from "react-redux";

const Game = (props) => {
  const [handCards, setHandCards] = useState("");
  const [leftPlayerCards, setLeftCards] = useState("");
  const [rightPlayerCards, setRightCards] = useState("");
  const [topPlayerCards, setTopCards] = useState("");
  const [stack, setStack] = useState("");
  const [gameState, setGameState] = useState("");
  const [activeCard, setActiveCard] = useState("");
  const [connection, setConnection] = useState(null);
  const [bHubConnection, setbHubConnection] = useState(null);
  const [cheat, setCheat] = useState(false);
  const [showPlayerCards, setShowPlayerCards] = useState(false);

  const dispatch = useDispatch();

  const invokeJoinRoom = async (connection) => {
    console.log("invoking JoinRoom through", connection);
    await connection.invoke(
      "JoinRoom",
      `${props.boardId}`,
      `${props.username}`
    )
    setInterval(console.log(), 1500);

    const bHubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7297/BoardHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setbHubConnection(bHubConnection);

    bHubConnection.on("refreshBoards", () => {});

    if (bHubConnection) {
      bHubConnection.start().then(() => {
        bHubConnection.invoke("RefreshPage");
      });
    }
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
      console.log(player + " joined " + props.boardId);
    });

    connection.on("start", (game) => {
      setGameState(game);
      setHandCards(game.player1.cards);
      setLeftCards(game.player2.cards);
      setTopCards(game.player3.cards);
      setRightCards(game.player4.cards);
      setStack(game.stack);
      console.log(stack);
      setActiveCard(game.player1.cards[0]);
      console.log(game, "started");
      setShowPlayerCards(true);
      setTimeout(() => {
        setShowPlayerCards(false);
      }, 5000);
    });

    connection.on("playerPlayedCard", (player, card, game) => {
      console.log(player, "played", card, "game:", game);
      setGameState(game);
      setHandCards(game.player1.cards);
      setLeftCards(game.player2.cards);
      setTopCards(game.player3.cards);
      setRightCards(game.player4.cards);
      setStack(game.stack);
      console.log(stack);
      setActiveCard(game.player1.cards[0]);
    });

    connection.on("playerTookCard", (player, card, game) => {
      console.log(player, "took", card, "game:", game);
      setGameState(game);
      setHandCards(game.player1.cards);
      setLeftCards(game.player2.cards);
      setTopCards(game.player3.cards);
      setRightCards(game.player4.cards);
      setStack(game.stack);
      console.log(stack);
      setActiveCard(game.player1.cards[0]);
    });

    connection.on("notPlayersTurn", () => {
      console.log("Not players turn");
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

  const handleCheatCode = () => {
    setCheat(!cheat);
  };

  const handleExitGame = () => {
    console.log("BHUB CONNECTION:" + bHubConnection);
    console.log("handle exit game");
    connection.stop();
    console.log("game hub stopped");
    setInterval(console.log(), 1500);
    bHubConnection.invoke("RefreshPage");
  }

  return (
    <div className="game-component">
      <div className="game-wrapper">
        <div className="game-container">
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
                      <Card
                        cheat={cheat}
                        rotated={true}
                        value={card.text}
                        suit={card.suit}
                        key={card.text + card.suit}
                      ></Card>
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
                      <Card
                        cheat={cheat}
                        value={card.text}
                        suit={card.suit}
                        key={card.text + card.suit}
                      ></Card>
                    </div>
                  ))}
              </div>
              <div className="center-stack">
                {stack.stackSize > 0 && (
                  <Card
                    cheat={true}
                    id={stack.cards[0]}
                    value={stack.cards[0].text}
                    suit={stack.cards[0].suit}
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
                      <Card
                        cheat={cheat}
                        rotated={true}
                        value={card.text}
                        suit={card.suit}
                        key={card.text + card.suit}
                      ></Card>
                    </div>
                  ))}
              </div>
              <div className="bottom-player">
                <div className="bottom-cards">
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
                        {showPlayerCards ? (
                          <Card
                            cheat={true}
                            value={card.text}
                            suit={card.suit}
                            key={card.text + card.suit}
                          ></Card>
                        ) : (
                          <Card
                            cheat={cheat}
                            value={card.text}
                            suit={card.suit}
                            key={card.text + card.suit}
                          ></Card>
                        )}
                      </div>
                    ))}
                </div>
                {handCards && (
                  <div className="bottom-buttons">
                    <Button variant="secondary" onClick={handlePlayCard}>
                      Zagraj kartę
                    </Button>
                    <Button variant="secondary" onClick={handleGetCardDealer}>
                      Weź kartę od dealera
                    </Button>
                    <Button variant="secondary" onClick={handleGetCardStack}>
                      Weź kartę z wierzchu stosu
                    </Button>
                    <Button variant="secondary" onClick={handleEndGame}>
                      Zakończ grę
                    </Button>
                    {!cheat && (
                      <Button
                        style={{ color: "transparent" }}
                        variant="outlined"
                        onClick={handleCheatCode}
                      >
                        Cheat
                      </Button>
                    )}
                    {cheat && (
                      <Button
                        style={{ color: "transparent" }}
                        variant="outlined secondary"
                        onClick={handleCheatCode}
                      >
                        Cheat
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="key-game-buttons-wrapper">
          <div className="key-game-buttons-box">
          <Button id="ready" variant="primary">Gotowy</Button>
          <Button id="leave" variant="secondary" onClick={(e) => {props.setGo(!e); handleExitGame()}}>Opuść stół</Button></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
