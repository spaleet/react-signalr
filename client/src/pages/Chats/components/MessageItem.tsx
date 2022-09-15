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
        <p className={classes}>
            {props.msg.message}
        </p>
    )
}

export default MessageItem