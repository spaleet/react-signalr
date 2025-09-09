import { useContext } from 'react';
import { Message } from '@models/Message';
import { Typography, Box, Paper } from '@mui/material';
import { UserContext } from '@contexts/UserContext'
import { useTheme } from "@mui/material/styles";


interface MessageItemProps {
    msg: Message
}

const MessageItem = (props: MessageItemProps) => {

    const theme = useTheme();

    const userCtx = useContext(UserContext);
    const isYou: boolean = userCtx?.username == props.msg.username

    return (
        <Box
            display="flex"
            justifyContent={isYou ? "flex-end" : "flex-start"}
            mb={1.5}
        >
            <Paper
                elevation={1}
                sx={{
                    p: 1.5,
                    maxWidth: "75%",
                    minWidth: "25%",
                    bgcolor: isYou
                        ? theme.palette.chat?.sender
                        : theme.palette.chat?.receiver,
                    color: isYou ? "#fff" : "#000",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    borderRadius: 2,
                    borderTopLeftRadius: isYou ? 16 : 4,
                    borderTopRightRadius: isYou ? 4 : 16,
                }}
            >
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                    {props.msg.username}
                </Typography>
                <Typography variant="body1">{props.msg.message}</Typography>
            </Paper>
        </Box>
    );
}

export default MessageItem