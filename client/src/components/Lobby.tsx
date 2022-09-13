import { Grid, Divider, Box, Button, TextField, Paper, Typography, Avatar } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

interface LobbyProps {
    joinRoom: (username: string, room: string) => void,
}

const Lobby = (props: LobbyProps) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    return (
        <Grid sx={{
            minWidth: "100%", minHeight: "100vh", padding: "20px",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center',
        }}>

            <Paper sx={{ 
                p: 3, boxShadow: 2, display: 'flex', flexDirection: 'column',
                width: { xs: '100%', sm: '100%', md: '430px' }, alignItems: 'center'
            }} >

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <SendIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Join a room
                </Typography>

                <Divider variant='fullWidth' sx={{ mt: 1, mb: 2 }} />

                <Box
                    component="form"
                    onSubmit={e => {
                        e.preventDefault();
                        props.joinRoom(username, room)
                    }}
                >
                    <Box sx={{ pr: 3, pl: 3 }}>
                        <TextField
                            label="Username" fullWidth
                            type="text" required margin="dense"
                            onChange={e => setUsername(e.target.value)} />

                        <TextField
                            label="Room" fullWidth
                            type="text" required margin="dense"
                            onChange={e => setRoom(e.target.value)} />
                    </Box>

                    <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Join
                    </Button>
                </Box>

            </Paper>

        </Grid>

    )
}

export default Lobby