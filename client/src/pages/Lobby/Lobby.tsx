import { Box, Button, TextField, Paper, Typography, Avatar, Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import ChatDivider from '../../components/ChatDivider';

interface LobbyProps {
    connection: HubConnection
    onJoined: (success: boolean) => void
}

const Lobby = (props: LobbyProps) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setOpen(true);

        props.connection.invoke("JoinRoom", { username, roomId: room })
            .then(() => props.onJoined(true))
            .catch((e) => {
                console.log("Join room failed. : ", e);
                props.onJoined(false);
            })
            .finally(() => setOpen(false));
    }

    return (
        <>
            <Paper sx={{
                p: 3, boxShadow: 2, display: 'flex', flexDirection: 'column',
                width: { xs: '100%', sm: '60%', md: '430px' }, alignItems: 'center',
                borderRadius: '1.7rem'
            }}>

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <SendIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="primary.main">
                    Join a room
                </Typography>

                <ChatDivider width="62%" />

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

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Lobby