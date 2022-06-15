import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

const Game = (props) => {
    const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7297/GameHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
    })
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

    connection.onclose(async () => {
        await start();
    });

    start();

    return(
        <div>GAME:</div>
    )

}

export default Game