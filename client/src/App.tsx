import { Lobby, Chats } from './pages/_index';
import { Box, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { buildConnection, startConnection } from './utils/hubUtils';

const App = () => {

    const [connection, setConnection] = useState<HubConnection>();
    const [inRoom, setInRoom] = useState(false);

    useEffect(() => {
        const newConnection = buildConnection();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            startConnection(connection);
        }
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
                                : <Chats connection={connection} />
                            }
                        </>
                    }
                </Grid>
            </Container>
        </Box>
    )
};

export default App