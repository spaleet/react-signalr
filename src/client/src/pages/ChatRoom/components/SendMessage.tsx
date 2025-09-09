import React, { useState } from 'react'
import { TextField, Box, IconButton } from '@mui/material';
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

        <Box
            component="form" onSubmit={handleSubmit}
            display="flex" gap={1} p={2}
            borderTop={1} borderColor="divider" flexShrink={0}
        >
            <TextField
                fullWidth size="small" variant="outlined" placeholder="Type a message..."
                onChange={e => setMessage(e.target.value)}
                value={message} />

            <IconButton color="primary" type="submit">
                <SendIcon />
            </IconButton>
        </Box>
    )
}

export default SendMessage