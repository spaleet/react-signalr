import { useEffect, useRef, useContext } from 'react'
import { Paper, Typography, Grid, Box, Divider, IconButton } from '@mui/material';
import MessageItem from './components/MessageItem';
import SendMessage from './components/SendMessage';
import Users from './components/Users';
import { ArrowBackIos } from '@mui/icons-material';
import { HubContext, UserContext } from '../../contexts/_index';

const ChatRoom = () => {

  const hubCtx = useContext(HubContext);
  const userCtx = useContext(UserContext);

  const onSendMessage = async (message: string) => {
    try {
      await hubCtx?.connection?.invoke("SendMessage", message)
    } catch (e) {
      console.log("Send Message failed! ERROR : ", e);
    }
  }

  const leaveRoom = async () => {
    try {
      await hubCtx?.connection?.stop();
    } catch (e) {
      console.log("Leave room failed! ERROR : ", e);
    }
  }

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight });
    }
  }, [hubCtx?.messages]);


  return (
    <Grid container component={Paper} direction="row" sx={{
      p: 3, boxShadow: 2,
      width: "100%",
      borderRadius: '1.3rem', height: { xs: '90vh', md: '80vh' }
    }} spacing={2}>

      <Grid item xs={12}
        sx={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', mb: 2, paddingLeft: '0px !important'
        }}
      >
        <IconButton color='error' onClick={() => leaveRoom()}>
          <ArrowBackIos />
        </IconButton>

        <Typography variant="h5" color="primary.main">
          {userCtx?.roomId}
        </Typography>

      </Grid>

      <Users />

      <Grid item xs={12} md={9}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.12)',
          paddingTop: '0px !important',
          borderRadius: '10px',
          height: '90%'
        }}>

        <Box
          ref={messageRef}
          className="message-container"
          sx={{
            height: '83%'
          }}>

          {hubCtx?.messages.map((item, index) => (
            <MessageItem key={index} msg={item} />
          ))}

        </Box>

        <Divider sx={{ marginRight: '16px' }} />

        <SendMessage onSendMessage={onSendMessage} />

      </Grid>

    </Grid>
  )
}

export default ChatRoom