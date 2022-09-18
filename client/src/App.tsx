import { Lobby, Chats } from './pages/_index';
import { Box, Container, Grid, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { buildConnection, startConnection } from './utils/hubUtils';
import { Message } from './models/Message';

const App = () => {

    const [connection, setConnection] = useState<HubConnection>();
    const [inRoom, setInRoom] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    useEffect(() => {
        const newConnection = buildConnection();

        setConnection(newConnection);
    }, []);

    useEffect(() => {

        if (connection) {
            startConnection(connection)
                .then(() => {
                    connection.on("ReceiveMessage", (username, message) => {
                        setMessages(messages => [...messages, { username, message }]);
                    });
                });
        }
    }, [connection]);

    return (
        <>
            <Box sx={{ width: "100%", height: '100vh' }}>
                <Container>
                    <Box sx={{
                        minWidth: "100%", minHeight: "100vh", padding: "20px",
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center',
                    }}>
                        {connection &&
                            <>
                                {!inRoom
                                    ? <Lobby connection={connection}
                                        onJoined={(success) => {

                                            if (!success) {
                                                setErrorAlertOpen(true)
                                            }
                                            setInRoom(success)
                                        }} />
                                    : <Chats connection={connection} messages={messages} />}
                            </>}
                    </Box>
                </Container>
            </Box>

            <Snackbar open={errorAlertOpen} autoHideDuration={1500}>
                <Alert severity="error" sx={{ width: '100%' }} variant="filled">
                    Couldn't join the room!
                </Alert>
            </Snackbar>

        </>
    )
};

export default App