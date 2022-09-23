import { Lobby, Chats } from './pages/_index';
import { Box, Container, Grid, Snackbar, Alert } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Message } from './models/Message';
import { UserContextProvider } from './contexts/UserContext';
import { HubContext } from './contexts/HubContext';

const App = () => {

    const hubCtx = useContext(HubContext);

    const [inRoom, setInRoom] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    useEffect(() => {

        if (hubCtx?.connectionStarted) {
            hubCtx?.connection?.onclose(() => {
                setInRoom(false)
            });
        }
    }, [hubCtx?.connection]);

    return (
        <>
            <UserContextProvider>
                <Box sx={{ width: "100%", height: '100vh' }}>
                    <Container>
                        <Box sx={{
                            minWidth: "100%", minHeight: "100vh", padding: "20px",
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center',
                        }}>
                            {hubCtx?.connection !== null &&
                                <>
                                    {!inRoom
                                        ? <Lobby
                                            onJoined={(success) => {

                                                if (!success) {
                                                    setErrorAlertOpen(true)
                                                }
                                                setInRoom(success)
                                            }} />
                                        : <Chats messages={messages} />}
                                </>}
                        </Box>
                    </Container>
                </Box>
            </UserContextProvider>


            <Snackbar open={errorAlertOpen} autoHideDuration={1500}>
                <Alert severity="error" sx={{ width: '100%' }} variant="filled">
                    Couldn't join the room!
                </Alert>
            </Snackbar>

        </>
    )
};

export default App