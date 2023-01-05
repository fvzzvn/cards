import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const mainPlayerName = useSelector(
    (state) => state.userCredentials.displayName
  );

  const [handCards, setHandCards] = useState("");
  const [leftPlayerCards, setLeftCards] = useState("");
  const [rightPlayerCards, setRightCards] = useState("");
  const [topPlayerCards, setTopCards] = useState("");
  const [mainPlayerId, setMainPlayerId] = useState("");
  const [leftPlayerId, setLeftPlayerId] = useState("");
  const [topPlayerId, setTopPlayerId] = useState("");
  const [rightPlayerId, setRightPlayerId] = useState("");
  const [stack, setStack] = useState("");
  const [gameState, setGameState] = useState("");
  const [activeCard, setActiveCard] = useState("");
  const [connection, setConnection] = useState(null);
  const [bHubConnection, setbHubConnection] = useState(null);
  const [cheat, setCheat] = useState(false);
  const [showPlayerCards, setShowPlayerCards] = useState(false);
  const [waitForQueenAction, setWaitForQueenAction] = useState(false);
  const [queenIdsArray, setQueenIdsArray] = useStateCallback([]);
  const [queenCardArray, setQueenCardArray] = useStateCallback([]);
  const [waitForJackAction, setWaitForJackAction] = useState(false);
  const [jackIdsArray, setJackIdsArray] = useStateCallback([]);
  const [jackCardArray, setJackCardArray] = useStateCallback([]);
  const dispatch = useDispatch();

  const invokeJoinRoom = async (connection) => {
    console.log("invoking JoinRoom through", connection);
    await connection.invoke(
      "JoinRoom",
      `${props.boardId}`,
      `${props.username}`
    );
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
      if (mainPlayerName === game.player1.name) {
        setHandCards(game.player1.cards);
        setLeftCards(game.player2.cards);
        setTopCards(game.player3.cards);
        setRightCards(game.player4.cards);
        setActiveCard(game.player1.cards[0]);
        setMainPlayerId(game.player1.id);
        setLeftPlayerId(game.player2.id);
        setTopPlayerId(game.player3.id);
        setRightPlayerId(game.player4.id);
      } else if (mainPlayerName === game.player2.name) {
        setHandCards(game.player2.cards);
        setLeftCards(game.player3.cards);
        setTopCards(game.player4.cards);
        setRightCards(game.player1.cards);
        setActiveCard(game.player2.cards[0]);
        setMainPlayerId(game.player2.id);
        setLeftPlayerId(game.player3.id);
        setTopPlayerId(game.player4.id);
        setRightPlayerId(game.player1.id);
      } else if (mainPlayerName === game.player3.name) {
        setHandCards(game.player3.cards);
        setLeftCards(game.player4.cards);
        setTopCards(game.player1.cards);
        setRightCards(game.player2.cards);
        setActiveCard(game.player3.cards[0]);
        setMainPlayerId(game.player3.id);
        setLeftPlayerId(game.player4.id);
        setTopPlayerId(game.player1.id);
        setRightPlayerId(game.player2.id);
      } else if (mainPlayerName === game.player4.name) {
        setHandCards(game.player4.cards);
        setLeftCards(game.player1.cards);
        setTopCards(game.player2.cards);
        setRightCards(game.player3.cards);
        setActiveCard(game.player4.cards[0]);
        setMainPlayerId(game.player4.id);
        setLeftPlayerId(game.player1.id);
        setTopPlayerId(game.player2.id);
        setRightPlayerId(game.player3.id);
      }
      setStack(game.stack);
      console.log(stack);
      console.log(game, "started");
      setShowPlayerCards(true);
      setTimeout(() => {
        setShowPlayerCards(false);
      }, 5000);
    });

    connection.on("playerPlayedCard", (player, card, game) => {
      console.log(player, "played", card, "game:", game);
      setGameState(game);
      if (mainPlayerName === game.player1.name) {
        setHandCards(game.player1.cards);
        setLeftCards(game.player2.cards);
        setTopCards(game.player3.cards);
        setRightCards(game.player4.cards);
        setActiveCard(game.player1.cards[0]);
      } else if (mainPlayerName === game.player2.name) {
        setHandCards(game.player2.cards);
        setLeftCards(game.player3.cards);
        setTopCards(game.player4.cards);
        setRightCards(game.player1.cards);
        setActiveCard(game.player2.cards[0]);
      } else if (mainPlayerName === game.player3.name) {
        setHandCards(game.player3.cards);
        setLeftCards(game.player4.cards);
        setTopCards(game.player1.cards);
        setRightCards(game.player2.cards);
        setActiveCard(game.player3.cards[0]);
      } else if (mainPlayerName === game.player4.name) {
        setHandCards(game.player4.cards);
        setLeftCards(game.player1.cards);
        setTopCards(game.player2.cards);
        setRightCards(game.player3.cards);
        setActiveCard(game.player4.cards[0]);
      }
      setStack(game.stack);
      console.log(stack);
    });

    connection.on("playerTookCard", (player, card, game) => {
      console.log(player, "took", card, "game:", game);
      setGameState(game);
      if (mainPlayerName === game.player1.name) {
        setHandCards(game.player1.cards);
        setLeftCards(game.player2.cards);
        setTopCards(game.player3.cards);
        setRightCards(game.player4.cards);
        setActiveCard(game.player1.cards[0]);
      } else if (mainPlayerName === game.player2.name) {
        setHandCards(game.player2.cards);
        setLeftCards(game.player3.cards);
        setTopCards(game.player4.cards);
        setRightCards(game.player1.cards);
        setActiveCard(game.player2.cards[0]);
      } else if (mainPlayerName === game.player3.name) {
        setHandCards(game.player3.cards);
        setLeftCards(game.player4.cards);
        setTopCards(game.player1.cards);
        setRightCards(game.player2.cards);
        setActiveCard(game.player3.cards[0]);
      } else if (mainPlayerName === game.player4.name) {
        setHandCards(game.player4.cards);
        setLeftCards(game.player1.cards);
        setTopCards(game.player2.cards);
        setRightCards(game.player3.cards);
        setActiveCard(game.player4.cards[0]);
      }
      setStack(game.stack);
      console.log(stack);
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

    connection.on("playerPlayedSpecialCard", (player, card, game) => {
      console.log("player played special card");
      if (card.text === "Queen") {
        console.log("QUEEN PLAYED")
        setActiveCard(card);
        setWaitForQueenAction(true);
      }
      if (card.text === "Jack") {
        console.log("JACK PLAYED");
        setActiveCard(card);
        setWaitForJackAction(true);
      }
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
  };

  function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // init mutable ref container for callbacks
  
    const setStateCallback = useCallback((state, cb) => {
      cbRef.current = cb; // store current, passed callback in ref
      setState(state);
    }, []); // keep object reference stable, exactly like `useState`
  
    useEffect(() => {
      // cb.current is `null` on initial render, 
      // so we only invoke callback on state *updates*
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null; // reset callback after execution
      }
    }, [state]);
  
    return [state, setStateCallback];
  }
  
  const handleQueenAction = (id, card) => {
    console.log("HANDLING QUEEN ACTION...", activeCard, id, card);
    setQueenIdsArray(current => [...current, id], () => {
      console.log(queenIdsArray);
    });
    setQueenCardArray(current => [...current, card], () => {
      console.log(queenCardArray);
    });
    if(queenCardArray.length === 2 && queenIdsArray.length === 2){
      // console.log("INVOKING QUEEN SPECIAL CARD WITH ARRAY: ", [activeCard, queenIdsArray, queenCardArray]);
      // connection.invoke("PlayedSpecialCard", [activeCard, queenIdsArray, queenCardArray]);
      try {
        console.log("INVOKING QUEEN SPECIAL CARD WITH ARRAY: ", [activeCard, queenIdsArray, queenCardArray]);
        connection.invoke("PlayedSpecialCard", [activeCard, queenIdsArray, queenCardArray]);
      } catch (err) {
        console.log(err);
      }
      setWaitForQueenAction(false);
    }
  }

  const handleJackAction = (id, card) => {
    console.log("HANDLING JACK ACTION...", activeCard, id, card);
    setJackIdsArray(current => [...current, id], () => {
      console.log(jackIdsArray);
    });
    setJackCardArray(current => [...current, card], () => {
      console.log(jackCardArray);
    });
    if(jackCardArray.length === 2 && jackIdsArray.length === 2){
      // console.log("INVOKING QUEEN SPECIAL CARD WITH ARRAY: ", [activeCard, queenIdsArray, queenCardArray]);
      // connection.invoke("PlayedSpecialCard", [activeCard, queenIdsArray, queenCardArray]);
      try {
        console.log("INVOKING JACK SPECIAL CARD WITH ARRAY: ", activeCard, jackIdsArray, jackCardArray);
        connection.invoke("PlayedSpecialCard", activeCard, jackIdsArray, jackCardArray);
      } catch (err) {
        console.log(err);
      }
      setWaitForJackAction(false);
    }
    //  connection.invoke(["Jack", id, card]);
    //  setWaitForJackAction(false);
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
                    onClick={waitForQueenAction ? () =>
                      handleQueenAction(leftPlayerId ,{
                        text: card.text,
                        suit: card.suit,
                        isSpecial: card.isSpecial,
                      }) : waitForJackAction ? () => 
                      handleJackAction(topPlayerId, {
                        text: card.text,
                        suit: card.suit,
                        isSpecial: card.isSpecial,
                      }) : undefined}>
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
                    onClick={waitForQueenAction ? () =>
                      handleQueenAction(topPlayerId ,{
                        text: card.text,
                        suit: card.suit,
                        isSpecial: card.isSpecial,
                      }) : waitForJackAction ? () => 
                    handleJackAction(topPlayerId, {
                      text: card.text,
                      suit: card.suit,
                      isSpecial: card.isSpecial,
                    }) : undefined}>
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
                  rightPlayerCards.reverse().map((card, i) => (
                    <div
                    onClick={waitForQueenAction ? () =>
                      handleQueenAction(rightPlayerId ,{
                        text: card.text,
                        suit: card.suit,
                        isSpecial: card.isSpecial,
                      }) : waitForJackAction ? () => 
                      handleJackAction(topPlayerId, {
                        text: card.text,
                        suit: card.suit,
                        isSpecial: card.isSpecial,
                      }) : undefined}
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
                        onClick={waitForQueenAction ? () =>
                          handleQueenAction(card, mainPlayerId ,{
                            text: card.text,
                            suit: card.suit,
                            isSpecial: card.isSpecial,
                          }) : waitForJackAction ? () => 
                          handleJackAction(topPlayerId, {
                            text: card.text,
                            suit: card.suit,
                            isSpecial: card.isSpecial,
                          }) : () =>
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
                        variant="outlined primary"
                        onClick={handleCheatCode}
                      >
                        Cheat
                      </Button>
                    )}
                    {cheat && (
                      <Button
                        style={{ color: "green" }}
                        variant="outlined primary"
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
            <Button id="ready" variant="primary">
              Gotowy
            </Button>
            <Button
              id="leave"
              variant="secondary"
              onClick={(e) => {
                props.setGo(!e);
                handleExitGame();
              }}
            >
              Opuść stół
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
