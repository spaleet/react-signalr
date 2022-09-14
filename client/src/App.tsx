import { Lobby, Chats } from './pages/_index';
import { Box, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { buildConnection, startConnection } from './utils/hubUtils';
import { Message } from './models/Message';

const App = () => {

    const [connection, setConnection] = useState<HubConnection>();
    const [inRoom, setInRoom] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const newConnection = buildConnection();

        setConnection(newConnection);
    }, []);

    useEffect(() => {

        const startAndConfigure = async () => {
            if (connection) {
                await startConnection(connection);
                connection.on("ReceiveMessage", (username, message) => {
                    setMessages(messages => [...messages, { username, message }]);
                });
            
            }
        }

        startAndConfigure();
    }, [connection]);

    return (
        <Box sx={{ width: "100%", height: '100vh' }}>
            <Container>
                <Grid sx={{
                    minWidth: "100%", minHeight: "100vh", padding: "20px",
                    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center',
                }}>
                    {connection &&
                        <>
                            {!inRoom
                                ? <Lobby connection={connection} onJoined={setInRoom} />
                                : <Chats messages={messages} />
                            }
                        </>
                    }
                </Grid>
            </Container>
        </Box>
    )
};

export default App