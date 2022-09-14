import { useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { Message } from '../models/Message';
import { MessageContainer, ChatDivider } from '../components/_index';
import { Paper, Divider, Typography } from '@mui/material';

interface ChatsProps {
  connection: HubConnection
}

const Chats = (props: ChatsProps) => {

  const [messages, setMessages] = useState<Message[]>([{ message: "fdf", username: "sfd" }]);

  useEffect(() => {
    if (props.connection) {
      console.log("effected");

      props.connection.on("ReceiveMessage", (user, message) => {
        console.log("ReceiveMessage", user, message);

        setMessages(messages => [...messages, { username: user, message }]);
      });
    }
  }, [props.connection]);

  return (
    <Paper sx={{
      p: 3, boxShadow: 2, display: 'flex', flexDirection: 'column',
      width: "100%", alignItems: 'center',
      borderRadius: '1.7rem', minHeight: "90vh"
    }} >
      <Typography variant="h5" color="primary.main">
        Chats are active
      </Typography>

      <ChatDivider width="64%" />

      <MessageContainer messages={messages} />
    </Paper>
  )
}

export default Chats