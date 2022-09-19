import { Message } from '../../models/Message';
import { Paper, Typography, Grid, Box, Divider, Button } from '@mui/material';
import MessageItem from './components/MessageItem';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import SendMessage from './components/SendMessage';
import Rooms from './components/Rooms';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const randomBool = () => {
  return Math.random() < 0.5;
}

interface ChatsProps {
  connection: HubConnection
  messages: Message[]
}

const Chats = (props: ChatsProps) => {

  const onSendMessage = async (message: string) => {
    try {
      console.log("here");

      await props.connection.invoke("SendMessage", message)
    } catch (e) {
      console.log(e);
    }
  }

  const leaveRoom = async () => {
    try {
      await props.connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Grid container component={Paper} direction="row" sx={{
      p: 3, boxShadow: 2,
      width: "100%",
      borderRadius: '1.3rem', height: '80vh'
    }} spacing={2}>

      <Grid item xs={12} sx={{ display: 'center', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>

        <Button color='error' variant='contained' onClick={() => leaveRoom()}>
          Leave Room
        </Button>

        <Typography variant="h5" color="primary.main">
          Chats!
        </Typography>

      </Grid>

      <Rooms />

      <Grid item xs={9} sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', paddingTop: '0px !important' }}>
        <Box sx={{ height: '58vh' }} className="message-container">
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