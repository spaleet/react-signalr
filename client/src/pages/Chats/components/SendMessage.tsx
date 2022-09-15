import React, { useState } from 'react'
import { Message } from '../../../models/Message'
import { Grid, Box, TextField, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface SendMessageProps {
    onSendMessage: (message: Message) => void
}

const SendMessage = (props: SendMessageProps) => {

    const [message, setMessage] = useState("dfgd")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.onSendMessage({ username: "sd", message });
    }

    return (
        <Grid container
            sx={{ padding: '20px' }}
            component="form"
            onSubmit={handleSubmit}
        >
            <Grid item xs={11}>
                <TextField
                    label="Message" fullWidth
                    onChange={e => setMessage(e.target.value)} />
            </Grid>
            <Grid xs={1}>
                <Fab color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
        </Grid>
    )
}

export default SendMessage