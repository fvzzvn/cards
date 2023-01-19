import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import HeaderBar from "./HeaderBar";
import Button from "react-bootstrap/Button";
import Card from "./Card";
import Results from "./Results";
import GameResults from "./GameResults";
import {
  setMainPlayer,
  setLeftPlayer,
  setTopPlayer,
  setRightPlayer,
} from "../slices/game";
import { v4 as uuid } from "uuid";
import { addParticipant } from "../slices/participants";
import { useDispatch, useSelector } from "react-redux";
import _, { forEach } from "lodash";
import { setAutoFreeze } from "immer";

const Game = (props) => {
  const mainPlayerName = useSelector(
    (state) => state.userCredentials.displayName
  );
  const leftPlayerName = useSelector((state) => state.game.leftPlayerName);
  const topPlayerName = useSelector((state) => state.game.topPlayerName);
  const rightPlayerName = useSelector((state) => state.game.rightPlayerName);

  const mainPlayerId = useSelector((state) => state.game.mainPlayerId);
  const leftPlayerId = useSelector((state) => state.game.leftPlayerId);
  const topPlayerId = useSelector((state) => state.game.topPlayerId);
  const rightPlayerId = useSelector((state) => state.game.rightPlayerId);

  const [handCards, setHandCards] = useState("");
  const [leftPlayerCards, setLeftCards] = useState("");
  const [rightPlayerCards, setRightCards] = useState("");
  const [topPlayerCards, setTopCards] = useState("");
  const [stack, setStack] = useState("");
  const [gameState, setGameState] = useState([]);
  const [activeCard, setActiveCard] = useState("");
  const [connection, setConnection] = useState(null);
  const [bHubConnection, setbHubConnection] = useState(null);
  const [cheat, setCheat] = useState(false);
  const [showPlayerCards, setShowPlayerCards] = useState(false);
  const [showRoundResults, setShowRoundResults] = useState(false);
  const [showGameResults, setShowGameResults] = useState(false);
  const [roundResults, setRoundResults] = useState([]);
  const [gameResults, setGameResults] = useState([]);
  const [queen, setQueen] = useState("");
  const [waitForQueenAction, setWaitForQueenAction] = useState(false);
  const [queenIdsArray, setQueenIdsArray] = useStateCallback([]);
  const [queenCardArray, setQueenCardArray] = useStateCallback([]);
  const [jack, setJack] = useState("");
  const [waitForJackAction, setWaitForJackAction] = useState(false);
  const [jackIdsArray, setJackIdsArray] = useStateCallback([]);
  const [jackCardArray, setJackCardArray] = useStateCallback([]);
  const [stun, setStun] = useState(false);
  const dispatch = useDispatch();

  const invokeJoinRoom = async (connection) => {
    console.log("invoking JoinRoom through", connection);
    console.log(
      "await connection.invoke JoinRoom boardID:" +
        props.boardId +
        " boardMode:" +
        props.boardMode +
        " username:" +
        props.username
    );

    await connection.invoke(
      "JoinRoom",
      `${props.boardId}`,
      `${props.boardMode}`,
      `${props.username}`
    );
    setTimeout(() => {
      console.log();
    }, 1500);

    const bHubConnection = new HubConnectionBuilder()
      .withUrl("https://ratsapi.online/BoardHub", {
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
      .withUrl("https://ratsapi.online/GameHub", {
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

    connection.on("playedLeftGame", () => {
      props.setGo(false);
    });

    connection.on("start", (game) => {
      setGameState(game);
      if (mainPlayerName === game.player1.name) {
        setHandCards(game.player1.cards);
        setLeftCards(game.player2.cards);
        setTopCards(game.player3.cards);
        setRightCards(game.player4.cards);
        setActiveCard(game.player1.cards[0]);
        let id1 = game.player1.id;
        let n1 = game.player1.name;
        let id2 = game.player2.id;
        let n2 = game.player2.name;
        let id3 = game.player3.id;
        let n3 = game.player3.name;
        let id4 = game.player4.id;
        let n4 = game.player4.name;
        console.log(id1, n1, id2, n2, id3, n3, id4, n4);
        dispatch(setMainPlayer([id1, n1]));
        dispatch(setLeftPlayer([id2, n2]));
        dispatch(setTopPlayer([id3, n3]));
        dispatch(setRightPlayer([id4, n4]));
      } else if (mainPlayerName === game.player2.name) {
        setHandCards(game.player2.cards);
        setLeftCards(game.player3.cards);
        setTopCards(game.player4.cards);
        setRightCards(game.player1.cards);
        setActiveCard(game.player2.cards[0]);
        let id1 = game.player1.id;
        let n1 = game.player1.name;
        let id2 = game.player2.id;
        let n2 = game.player2.name;
        let id3 = game.player3.id;
        let n3 = game.player3.name;
        let id4 = game.player4.id;
        let n4 = game.player4.name;
        console.log(id1, n1, id2, n2, id3, n3, id4, n4);
        dispatch(setMainPlayer([id2, n2]));
        dispatch(setLeftPlayer([id3, n3]));
        dispatch(setTopPlayer([id4, n4]));
        dispatch(setRightPlayer([id1, n1]));
      } else if (mainPlayerName === game.player3.name) {
        setHandCards(game.player3.cards);
        setLeftCards(game.player4.cards);
        setTopCards(game.player1.cards);
        setRightCards(game.player2.cards);
        setActiveCard(game.player3.cards[0]);
        let id1 = game.player1.id;
        let n1 = game.player1.name;
        let id2 = game.player2.id;
        let n2 = game.player2.name;
        let id3 = game.player3.id;
        let n3 = game.player3.name;
        let id4 = game.player4.id;
        let n4 = game.player4.name;
        console.log(id1, n1, id2, n2, id3, n3, id4, n4);
        dispatch(setMainPlayer([id3, n3]));
        dispatch(setLeftPlayer([id4, n4]));
        dispatch(setTopPlayer([id1, n1]));
        dispatch(setRightPlayer([id2, n2]));
      } else if (mainPlayerName === game.player4.name) {
        setHandCards(game.player4.cards);
        setLeftCards(game.player1.cards);
        setTopCards(game.player2.cards);
        setRightCards(game.player3.cards);
        setActiveCard(game.player4.cards[0]);
        let id1 = game.player1.id;
        let n1 = game.player1.name;
        let id2 = game.player2.id;
        let n2 = game.player2.name;
        let id3 = game.player3.id;
        let n3 = game.player3.name;
        let id4 = game.player4.id;
        let n4 = game.player4.name;
        console.log(id1, n1, id2, n2, id3, n3, id4, n4);
        dispatch(setMainPlayer([id4, n4]));
        dispatch(setLeftPlayer([id1, n1]));
        dispatch(setTopPlayer([id2, n2]));
        dispatch(setRightPlayer([id3, n3]));
      }
      setStack(game.stack);
      console.log(game, "started");
      setShowPlayerCards(true);
      setTimeout(() => {
        setShowPlayerCards(false);
      }, 5000);
    });
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on("playerPlayedCard", (player, card, game) => {
        console.log(player, "played", card, "game:", game);
        setGameState(game);
        if (mainPlayerName === game.player1.name) {
          console.log(mainPlayerName);
          console.log(mainPlayerId);
          setHandCards(game.player1.cards);
          setLeftCards(game.player2.cards);
          setTopCards(game.player3.cards);
          setRightCards(game.player4.cards);
          setActiveCard(game.player1.cards[0]);
        } else if (mainPlayerName === game.player2.name) {
          console.log(mainPlayerName);
          console.log(mainPlayerId);
          setHandCards(game.player2.cards);
          setLeftCards(game.player3.cards);
          setTopCards(game.player4.cards);
          setRightCards(game.player1.cards);
          setActiveCard(game.player2.cards[0]);
        } else if (mainPlayerName === game.player3.name) {
          console.log(mainPlayerName);
          console.log(mainPlayerId);
          setHandCards(game.player3.cards);
          setLeftCards(game.player4.cards);
          setTopCards(game.player1.cards);
          setRightCards(game.player2.cards);
          setActiveCard(game.player3.cards[0]);
        } else if (mainPlayerName === game.player4.name) {
          console.log(mainPlayerName);
          console.log(mainPlayerId);
          setHandCards(game.player4.cards);
          setLeftCards(game.player1.cards);
          setTopCards(game.player2.cards);
          setRightCards(game.player3.cards);
          setActiveCard(game.player4.cards[0]);
        }
        setStack(game.stack);
      });

      connection.on("playerTookCard", (player, card, game) => {
        setGameState(game);
        console.log(player, "took", card, "game:", game);
        if (mainPlayerName === game.player1.name) {
          let cardList = _.cloneDeep(game.player1.cards);
          let cheatCard = cardList.find(
            (c) => c.text === card.text && c.suit === card.suit
          );
          if (cheatCard) {
            if (cheatCard) {
              cheatCard.queenCheat = true;
            }
          }
          setHandCards(cardList);
          setLeftCards(game.player2.cards);
          setTopCards(game.player3.cards);
          setRightCards(game.player4.cards);
          setActiveCard(game.player1.cards[0]);
          const timeoutId = setTimeout(() => {
            setHandCards(game.player1.cards);
          }, 5000);
          connection.on("playerPlayedCard", () => {
            clearTimeout(timeoutId);
          });
        } else if (mainPlayerName === game.player2.name) {
          let cardList = _.cloneDeep(game.player2.cards);
          let cheatCard = cardList.find(
            (c) => c.text === card.text && c.suit === card.suit
          );
          if (cheatCard) {
            if (cheatCard) {
              cheatCard.queenCheat = true;
            }
          }
          setHandCards(cardList);
          setLeftCards(game.player3.cards);
          setTopCards(game.player4.cards);
          setRightCards(game.player1.cards);
          setActiveCard(game.player2.cards[0]);
          const timeoutId = setTimeout(() => {
            setHandCards(game.player2.cards);
          }, 5000);
          connection.on("playerPlayedCard", () => {
            clearTimeout(timeoutId);
          });
        } else if (mainPlayerName === game.player3.name) {
          let cardList = _.cloneDeep(game.player3.cards);
          let cheatCard = cardList.find(
            (c) => c.text === card.text && c.suit === card.suit
          );
          if (cheatCard) {
            if (cheatCard) {
              cheatCard.queenCheat = true;
            }
          }
          setHandCards(cardList);
          setLeftCards(game.player4.cards);
          setTopCards(game.player1.cards);
          setRightCards(game.player2.cards);
          setActiveCard(game.player3.cards[0]);
          const timeoutId = setTimeout(() => {
            setHandCards(game.player3.cards);
          }, 5000);
          connection.on("playerPlayedCard", () => {
            clearTimeout(timeoutId);
          });
        } else if (mainPlayerName === game.player4.name) {
          let cardList = _.cloneDeep(game.player4.cards);
          let cheatCard = cardList.find(
            (c) => c.text === card.text && c.suit === card.suit
          );
          if (cheatCard) {
            if (cheatCard) {
              cheatCard.queenCheat = true;
            }
          }
          setHandCards(cardList);
          setLeftCards(game.player1.cards);
          setTopCards(game.player2.cards);
          setRightCards(game.player3.cards);
          setActiveCard(game.player4.cards[0]);
          const timeoutId = setTimeout(() => {
            setHandCards(game.player4.cards);
          }, 5000);
          connection.on("playerPlayedCard", () => {
            clearTimeout(timeoutId);
          });
        }
        setStack(game.stack);
      });

      connection.on(
        "applySpecialCardEffect",
        (card, player, game, playersList, cards) => {
          setGameState(game);
          if (card.text === "Queen") {
            if (mainPlayerName === game.player1.name) {
              if (playersList[0].id === game.player1.id) {
                let cardList = _.cloneDeep(game.player1.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setHandCards(cardList);
                setTimeout(() => {
                  setHandCards(game.player1.cards);
                }, 5000);
              } else if (playersList[0].id === game.player2.id) {
                let cardList = _.cloneDeep(game.player2.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setLeftCards(cardList);
                setTimeout(() => {
                  setLeftCards(game.player2.cards);
                }, 5000);
              } else if (playersList[0].id === game.player3.id) {
                let cardList = _.cloneDeep(game.player3.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setTopCards(cardList);
                setTimeout(() => {
                  setTopCards(game.player3.cards);
                }, 5000);
              } else if (playersList[0].id === game.player4.id) {
                let cardList = _.cloneDeep(game.player4.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setRightCards(cardList);
                setTimeout(() => {
                  setRightCards(game.player4.cards);
                }, 5000);
              }
            } else if (mainPlayerName === game.player2.name) {
              if (playersList[0].id === game.player2.id) {
                let cardList = _.cloneDeep(game.player2.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setHandCards(cardList);
                setTimeout(() => {
                  setHandCards(game.player2.cards);
                }, 5000);
              } else if (playersList[0].id === game.player3.id) {
                let cardList = _.cloneDeep(game.player3.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setLeftCards(cardList);
                setTimeout(() => {
                  setLeftCards(game.player3.cards);
                }, 5000);
              } else if (playersList[0].id === game.player4.id) {
                let cardList = _.cloneDeep(game.player4.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setTopCards(cardList);
                setTimeout(() => {
                  setTopCards(game.player4.cards);
                }, 5000);
              } else if (playersList[0].id === game.player1.id) {
                let cardList = _.cloneDeep(game.player1.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setRightCards(cardList);
                setTimeout(() => {
                  console.log(game.player1.cards);
                  setRightCards(game.player1.cards);
                }, 5000);
              }
            } else if (mainPlayerName === game.player3.name) {
              if (playersList[0].id === game.player3.id) {
                let cardList = _.cloneDeep(game.player3.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setHandCards(cardList);
                setTimeout(() => {
                  setHandCards(game.player3.cards);
                }, 5000);
              } else if (playersList[0].id === game.player4.id) {
                let cardList = _.cloneDeep(game.player4.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setLeftCards(cardList);
                setTimeout(() => {
                  setLeftCards(game.player4.cards);
                }, 5000);
              } else if (playersList[0].id === game.player1.id) {
                let cardList = _.cloneDeep(game.player1.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setTopCards(cardList);
                setTimeout(() => {
                  setTopCards(game.player1.cards);
                }, 5000);
              } else if (playersList[0].id === game.player2.id) {
                let cardList = _.cloneDeep(game.player2.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setRightCards(cardList);
                setTimeout(() => {
                  setRightCards(game.player2.cards);
                }, 5000);
              }
            } else if (mainPlayerName === game.player4.name) {
              if (playersList[0].id === game.player4.id) {
                let cardList = _.cloneDeep(game.player4.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setHandCards(cardList);
                setTimeout(() => {
                  setHandCards(game.player4.cards);
                }, 5000);
              } else if (playersList[0].id === game.player1.id) {
                let cardList = _.cloneDeep(game.player1.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setLeftCards(cardList);
                setTimeout(() => {
                  setLeftCards(game.player1.cards);
                }, 5000);
              } else if (playersList[0].id === game.player2.id) {
                let cardList = _.cloneDeep(game.player2.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setTopCards(cardList);
                setTimeout(() => {
                  setTopCards(game.player2.cards);
                }, 5000);
              } else if (playersList[0].id === game.player3.id) {
                let cardList = _.cloneDeep(game.player3.cards);
                let cheatCard = cardList.find(
                  (card) =>
                    card.text === cards[0].text && card.suit === cards[0].suit
                );
                if (cheatCard) {
                  cheatCard.queenCheat = true;
                }
                setRightCards(cardList);
                setTimeout(() => {
                  setRightCards(game.player3.cards);
                }, 5000);
              }
            }
            setStack(game.stack);
          }
          if (card.text === "Jack") {
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
          }
          setStun(false);
        }
      );

      connection.on("notPlayersTurn", () => {
        console.log("Not players turn");
      });
      connection.on("stackEmpty", () => {
        console.log("stack empty");
      });

      connection.on("roundEnding", () => {
        console.log("ROUND ENDING");
      });

      connection.on("roundResults", (roundResults, gameResults, cards) => {
        setShowRoundResults(true);
        setRoundResults([roundResults, gameResults, cards]);
        setTimeout(() => {
          setShowRoundResults(false);
        }, 10000);
      });

      connection.on("gameResults", (roundResults, gameResults, cards) => {
        setShowGameResults(true);
        setGameResults([roundResults, gameResults, cards]);
      });

      connection.on("newRound", (game) => {
        console.log("NEW ROUND:", game);
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
        console.log(game, "started");
        setShowPlayerCards(true);
        setTimeout(() => {
          setShowPlayerCards(false);
        }, 5000);
      });

      connection.on("playerPlayedSpecialCard", (player, card, game) => {
        console.log(player);
        console.log(mainPlayerId);
        if (player.id === mainPlayerId) {
          if (card.text === "Queen") {
            setQueen(card);
            setWaitForQueenAction(true);
          }
          if (card.text === "Jack") {
            setJack(card);
            setWaitForJackAction(true);
          }
        } else if (card.text === "Jack" || card.text === "Queen") {
          setStun(true);
        }
      });
    }
  }, [
    mainPlayerId,
    mainPlayerName,
    leftPlayerName,
    leftPlayerId,
    rightPlayerId,
    rightPlayerName,
    topPlayerId,
    topPlayerName,
  ]);

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
    try {
      await connection.invoke("RatATatCatEnding");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheatCode = () => {
    setCheat(!cheat);
  };

  const handleExitGame = () => {
    connection.stop();
    if (bHubConnection) {
        bHubConnection.invoke("RefreshPage");
        bHubConnection.stop();
    }
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
    console.log("HANDLING QUEEN ACTION...", queen, id, card);
    console.log(id);
    console.log(card);
    setQueenIdsArray(
      (current) => [...current, id],
      () => {
        console.log(queenIdsArray);
      }
    );
    setQueenCardArray(
      (current) => [...current, card],
      () => {
        console.log(queenCardArray);
      }
    );
  };

  useEffect(() => {
    if (queenCardArray.length === 1 && queenIdsArray.length === 1) {
      try {
        connection.invoke(
          "PlayedSpecialCard",
          queen,
          queenIdsArray,
          queenCardArray
        );
        setQueenIdsArray([]);
        setQueenCardArray([]);
      } catch (err) {
        console.log(err);
      }
      setWaitForQueenAction(false);
    }
  }, [queenCardArray, queenIdsArray]);

  const handleJackAction = (id, card) => {
    console.log("HANDLING JACK ACTION...", jack, id, card);
    setJackIdsArray(
      (current) => [...current, id],
      () => {
        console.log(jackIdsArray);
      }
    );
    setJackCardArray(
      (current) => [...current, card],
      () => {
        console.log(jackCardArray);
      }
    );
  };

  useEffect(() => {
    if (jackCardArray.length === 2 && jackIdsArray.length === 2) {
      try {
        connection.invoke(
          "PlayedSpecialCard",
          jack,
          jackIdsArray,
          jackCardArray
        );
        setJackIdsArray([]);
        setJackCardArray([]);
      } catch (err) {
        console.log(err);
      }
      setWaitForJackAction(false);
    }
  }, [jackIdsArray, jackCardArray]);

  useEffect(() => {}, [handCards]);

  useEffect(() => {
    console.log("Active Card is: " + activeCard.text + activeCard.suit);
  }, [activeCard]);

  useEffect(() => {
    console.log(mainPlayerId, mainPlayerName);
  }, [mainPlayerId, mainPlayerName]);

  return (
    <div className="game-component">
      {stun && <div className="stun"></div>}
      <div className="game-wrapper">
        {showRoundResults && (
          <div className="dim-screen">
            <div className="results-wrapper">
              <Results roundResults={roundResults} />
            </div>
          </div>
        )}
        {showGameResults && (
          <div className="dim-screen">
            <div className="results-wrapper">
              <GameResults
                gameResults={gameResults}
                setGo={props.setGo}
                handleExitGame={handleExitGame}
              />
            </div>
          </div>
        )}
        <div className="game-container">
          <div className="game-table">
            <div className="game-grid">
              <div className="left-player">
                {leftPlayerCards &&
                  leftPlayerCards.map((card, i) => (
                    <div
                      onClick={
                        waitForQueenAction
                          ? () =>
                              handleQueenAction(leftPlayerId, {
                                text: card.text,
                                suit: card.suit,
                                isSpecial: card.isSpecial,
                              })
                          : waitForJackAction
                          ? () =>
                              handleJackAction(leftPlayerId, {
                                text: card.text,
                                suit: card.suit,
                                isSpecial: card.isSpecial,
                              })
                          : undefined
                      }
                    >
                      {card.queenCheat ? (
                        <Card
                          cheat={true}
                          rotated={true}
                          value={card.text}
                          suit={card.suit}
                          key={card.text + card.suit}
                        ></Card>
                      ) : (
                        <Card
                          cheat={cheat}
                          rotated={true}
                          value={card.text}
                          suit={card.suit}
                          key={card.text + card.suit}
                        ></Card>
                      )}
                    </div>
                  ))}
              </div>
              <div className="top-player">
                {topPlayerCards &&
                  topPlayerCards.map((card, i) => (
                    <div
                      onClick={
                        waitForQueenAction
                          ? () =>
                              handleQueenAction(topPlayerId, {
                                text: card.text,
                                suit: card.suit,
                                isSpecial: card.isSpecial,
                              })
                          : waitForJackAction
                          ? () =>
                              handleJackAction(topPlayerId, {
                                text: card.text,
                                suit: card.suit,
                                isSpecial: card.isSpecial,
                              })
                          : undefined
                      }
                    >
                      {card.queenCheat ? (
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
                      onClick={
                        waitForQueenAction
                          ? () =>
                              handleQueenAction(rightPlayerId, {
                                text: card.text,
                                suit: card.suit,
                                isSpecial: card.isSpecial,
                              })
                          : waitForJackAction
                          ? () =>
                              handleJackAction(rightPlayerId, {
                                text: card.text,
                                suit: card.suit,
                                isSpecial: card.isSpecial,
                              })
                          : undefined
                      }
                    >
                      {card.queenCheat ? (
                        <Card
                          cheat={true}
                          rotated={true}
                          value={card.text}
                          suit={card.suit}
                          key={card.text + card.suit}
                        ></Card>
                      ) : (
                        <Card
                          cheat={cheat}
                          rotated={true}
                          value={card.text}
                          suit={card.suit}
                          key={card.text + card.suit}
                        ></Card>
                      )}
                    </div>
                  ))}
              </div>
              <div className="bottom-player">
                <div className="bottom-cards">
                  {handCards &&
                    handCards.map((card, i) => (
                      <div
                        onClick={
                          waitForQueenAction
                            ? () =>
                                handleQueenAction(mainPlayerId, {
                                  text: card.text,
                                  suit: card.suit,
                                  isSpecial: card.isSpecial,
                                })
                            : waitForJackAction
                            ? () =>
                                handleJackAction(mainPlayerId, {
                                  text: card.text,
                                  suit: card.suit,
                                  isSpecial: card.isSpecial,
                                })
                            : () =>
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
                        ) : card.queenCheat ? (
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
