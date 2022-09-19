import React, { useState } from 'react'
import { Grid, TextField, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface SendMessageProps {
    onSendMessage: (message: string) => void
}

const SendMessage = (props: SendMessageProps) => {

    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.onSendMessage(message);
        setMessage("")
    }

    return (
        <Grid container
            sx={{ padding: '20px' }}
            component="form"
            onSubmit={handleSubmit}
        >
            <Grid item xs={11}>
                <TextField
                    multiline maxRows={4} required
                    label="Message" fullWidth
                    onChange={e => setMessage(e.target.value)}
                    value={message} />
            </Grid>
            <Grid xs={1} sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Fab color="primary" size="small" type='submit'>
                    <SendIcon sx={{ fontSize: '20px' }} />
                </Fab>
            </Grid>
        </Grid>
    )
}

export default SendMessage