import { Message } from './../../../models/Message';
import { Typography } from '@mui/material';
import "./MessageItem.css"

interface MessageItemProps {
    msg: Message
    sent: boolean
}

const MessageItem = (props: MessageItemProps) => {
    
    const classes = `msg ${props.sent ? 'sent' : 'received'}`

    return (
        <Typography className={classes}>
            {props.msg.message}
        </Typography>
    )
}

export default MessageItem