import { HubConnectionBuilder } from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr/dist/esm/ILogger';
import { Lobby } from './components/_index';

const App = () => {

    const joinRoom = async (username: string, room: string) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7100")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                console.log("Message : ", message);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { username, roomId: room });
        } catch (e) {
            console.log(e);
        }
    }

    return <div>
        <Lobby joinRoom={joinRoom} />
    </div>
};

export default App