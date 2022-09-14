import { Lobby } from '@pages';
import { Box, Container } from '@mui/material';

const App = () => {

    const joinedRoom = (success: boolean) => {
        if(success){
            alert("Successfully joined room");
        } else {
            alert("Error : couldn't join room");
        }
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