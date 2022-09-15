import { Message } from './../../../models/Message';
import { Typography, Grid } from '@mui/material';
import "./MessageItem.css"

interface MessageItemProps {
    msg: Message
    sent: boolean
}

const MessageItem = (props: MessageItemProps) => {

    const classes = `msg ${props.sent ? 'sent' : 'received'}`

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes}>
                    {props.msg.message}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2'>{props.msg.username}</Typography>
            </Grid>
        </Grid>

    )
}

export default MessageItem