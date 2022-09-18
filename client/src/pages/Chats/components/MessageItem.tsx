import { Message } from './../../../models/Message';
import { Typography, Grid } from '@mui/material';

interface MessageItemProps {
    msg: Message
    sent: boolean
}

const MessageItem = (props: MessageItemProps) => {

    const classes = `msg ${props.sent ? 'sent' : 'received'}`

    return (
        <Grid container direction="column" sx={{alignItems: props.sent ? 'flex-end' : 'flex-start'}}>
            <Typography className={classes}>
                    {props.msg.message}
            </Typography>
            <Typography variant='body2'>{props.msg.username}</Typography>
        </Grid>

    )
}

export default MessageItem