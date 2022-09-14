import { Lobby, Chats } from './pages/_index';
import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { buildConnection, startConnection } from './utils/hubUtils';

const App = () => {

    const [connection, setConnection] = useState<HubConnection>();

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

                {connection &&
                    <>
                        <Lobby connection={connection} />
                        <Chats connection={connection} />
                    </>
                }

            </Container>
        </Box>
    )
};

export default App