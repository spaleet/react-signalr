import { Box, Button, TextField, Paper, Typography, Avatar } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import ChatDivider from '../components/ChatDivider';

interface LobbyProps {
    connection: HubConnection
    onJoined: (success: boolean) => void
}

const Lobby = (props: LobbyProps) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await props.connection.invoke("JoinRoom", { username, roomId: room });
            props.onJoined(true);
        } catch (e) {
            console.log("Join room failed. : ", e);
            props.onJoined(false);
        }
    }

    return (
        <Paper sx={{
            p: 3, boxShadow: 2, display: 'flex', flexDirection: 'column',
            width: { xs: '100%', sm: '60%', md: '430px' }, alignItems: 'center',
            borderRadius: '1.7rem'
        }} >

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SendIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Join a room
            </Typography>

            <ChatDivider width="100%" />


            <Box
                component="form"
                onSubmit={handleSubmit}
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
    )
}

export default Lobby