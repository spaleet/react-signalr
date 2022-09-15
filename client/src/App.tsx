import { Lobby, Chats } from './pages/_index';
import { Box, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { buildConnection, startConnection } from './utils/hubUtils';
import { Message } from './models/Message';

const defaultData: Message[] = [
    { username: "sfds", message: "dfd" },
    { username: "gff", message: "dfd" },
    { username: "sdf", message: "dfd" },
]

const App = () => {

    const [connection, setConnection] = useState<HubConnection>();
    const [inRoom, setInRoom] = useState(false);
    const [messages, setMessages] = useState<Message[]>(defaultData);

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
                <Box sx={{
                    minWidth: "100%", minHeight: "100vh", padding: "20px",
                    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center',
                }}>
                    {connection &&
                        <>
                            {!inRoom
                                ? <Lobby connection={connection} onJoined={setInRoom} />
                                : <Chats connection={connection} messages={messages} />
                            }
                        </>
                    }
                </Box>
            </Container>
        </Box>
    )
};

export default App