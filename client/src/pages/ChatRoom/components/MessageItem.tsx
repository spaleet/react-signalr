import { useContext } from 'react';
import { Message } from './../../../models/Message';
import { Typography, Grid } from '@mui/material';
import { UserContext } from '../../../contexts/UserContext'

interface MessageItemProps {
    msg: Message
}

const MessageItem = (props: MessageItemProps) => {

    const userCtx = useContext(UserContext);
    const sent: boolean = userCtx?.username == props.msg.username

    const classes = `msg ${sent ? 'sent' : 'received'}`

    return (
        <Grid container direction="column" sx={{ alignItems: sent ? 'flex-end' : 'flex-start' }}>
            <Typography className={classes}>
                {props.msg.message}
            </Typography>
            <Typography variant='body2'>{props.msg.username}</Typography>
        </Grid>

    )
}

export default MessageItem