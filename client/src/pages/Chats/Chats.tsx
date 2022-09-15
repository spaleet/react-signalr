import { Message } from '../../models/Message';
import { Paper, Typography, Grid, Box, Divider } from '@mui/material';
import MessageItem from './components/MessageItem';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import SendMessage from './components/SendMessage';
import Rooms from './components/Rooms';

const randomBool = () => {
  return Math.random() < 0.5;
}

interface ChatsProps {
  connection: HubConnection
  messages: Message[]
}

const Chats = (props: ChatsProps) => {

  const onSendMessage = async (message: Message) => {
    try {
      await props.connection.invoke("SendMessage", message)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Grid container component={Paper} direction="row" sx={{
      p: 3, boxShadow: 2, 
      width: "100%", 
      borderRadius: '1.3rem', height: '80vh'
    }} >
      <Grid item xs={12} sx={{alignItems: 'center'}}>
        <Typography variant="h5" color="primary.main">
          Chats are active
        </Typography>
      </Grid>

      <Rooms />

      <Grid item xs={9}>
        <Box sx={{ height: '70vh', overflow: 'auto' }}>
          {props.messages.map((item, index) => (
            <MessageItem key={index} msg={item} sent={randomBool()} />
          ))}
        </Box>

        <Divider />

        <SendMessage onSendMessage={onSendMessage} />

      </Grid>

    </Grid>
  )
}

export default Chats