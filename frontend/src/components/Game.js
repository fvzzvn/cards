import React, { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

const Game = (props) => {
    const [handCards, setHandCards] = useState("");

    const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7297/GameHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

    async function start() {
        try {
            await connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.log(err);
            setTimeout(start, 10000);
        }
    };

    // connection.onclose(async () => {
    //     await start();
    // });

    connection.on("playerPlayedCard", (player, card, game) =>{
        console.log("player", player, "played", card);
    });

    connection.on("playerJoined", (player) =>{
        console.log(player, "joined game");
    })

    const handlePlayCard = async (card) => {
        const player = 1;
        const game = 1;
        try {
            await connection.invoke("playerPlayedCard", (player, card, game));
        }
        catch (err){
            console.log(err);
        };
    }


    start();
    // handlePlayCard();

    return(
        <div>GAME:</div>
    )

}

export default Game