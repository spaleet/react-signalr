import { Lobby } from './components/_index';
import { Box, Container } from '@mui/material';

const App = () => {

    const joinedRoom = () => {
        alert("Successfully joined room");
    }

    return (
        <Box sx={{ width: "100%", height: '100vh' }}>
            <Container>
                <Lobby onJoinedRoom={joinedRoom} />
            </Container>
        </Box>
    )
};

export default App