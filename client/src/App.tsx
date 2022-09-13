import { HubConnectionBuilder } from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr/dist/esm/ILogger';
import { Lobby } from './components/_index';
import { useState } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { Box, Container } from '@mui/material';

const App = () => {

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    const joinRoom = async (username: string, room: string) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7100/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                console.log("Message : ", message);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { username, roomId: room });
            setHubConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box sx={{ width: "100%", height: '100vh' }}>
            <Container>
                <Lobby joinRoom={joinRoom} />
            </Container>
        </Box>
    )
};

export default App