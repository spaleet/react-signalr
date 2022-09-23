import { Message } from '../../models/Message';
import { Paper, Typography, Grid, Box, Divider, Button, IconButton } from '@mui/material';
import MessageItem from './components/MessageItem';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import SendMessage from './components/SendMessage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

interface ChatsProps {
  connection: HubConnection
  messages: Message[]
}

const Chats = (props: ChatsProps) => {

  const userCtx = useContext(UserContext);

  const onSendMessage = async (message: string) => {
    try {
      await props.connection.invoke("SendMessage", message)
    } catch (e) {
      console.log("Send Message failed! ERROR : ", e);
    }
  }

  const leaveRoom = async () => {
    try {
      await props.connection.stop();
    } catch (e) {
      console.log("Leave room failed! ERROR : ", e);
    }
  }

  return (
    <Grid container component={Paper} direction="row" sx={{
      p: 3, boxShadow: 2,
      width: "100%",
      borderRadius: '1.3rem', height: { xs: '90vh', md: '80vh' }
    }} spacing={2}>

      <Grid item xs={12}
        sx={{
          display: 'center', alignItems: 'center',
          justifyContent: 'space-between', mb: 2, paddingLeft: '0px !important'
        }}
      >
        <IconButton color='error' onClick={() => leaveRoom()}>
          <ArrowBackIosIcon />
        </IconButton>

        <Typography variant="h5" color="primary.main">
          {userCtx?.username}
        </Typography>

      </Grid>

      {/* <Rooms /> */}

      <Grid item xs={12}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.12)',
          paddingTop: '0px !important',
          borderRadius: '10px'
        }}>

        <Box
          className="message-container"
          sx={{
            height: {
              md: '49vh',
              sm: '50vh',
              xs: '65vh',
              lg: '58vh',
            }
          }}>

          {props.messages.map((item, index) => (
            <MessageItem key={index} msg={item} />
          ))}

        </Box>

        <Divider sx={{ marginRight: '16px' }} />

        <SendMessage onSendMessage={onSendMessage} />

      </Grid>

    </Grid>
  )
}

export default Chats