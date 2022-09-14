import React from 'react'
import { Message } from './../models/Message';
import { Grid } from '@mui/material';

interface MessageContainerProps {
    messages: Message[]
  }
const MessageContainer = (props: MessageContainerProps) => {
    return (
        <Grid>
            {props.messages.map((item, index) => (
                <div key={index}>
                    {item.message}
                </div>
            ))}
        </Grid>
    )
}

export default MessageContainer