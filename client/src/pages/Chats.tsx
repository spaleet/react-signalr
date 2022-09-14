import { Message } from '../models/Message';
import { ChatDivider } from '../components/_index';
import { Paper, Typography, Grid } from '@mui/material';

interface ChatsProps {
  messages: Message[]
}

const Chats = (props: ChatsProps) => {

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

      <Grid>
        {props.messages.map((item, index) => (
          <div key={index}>
            {item.message}
          </div>
        ))}
      </Grid>
    </Paper>
  )
}

export default Chats