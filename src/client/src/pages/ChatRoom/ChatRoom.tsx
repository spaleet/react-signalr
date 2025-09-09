import { useState, useRef, useEffect, useContext } from "react";
import { Box, Typography, Paper, Button, Menu, MenuItem } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { HubContext, UserContext } from '@contexts/_index';
import { MessageItem, SendMessage } from './components/_index';

export default function ChatRoom() {

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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [hubCtx?.messages]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleUsersClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUsersClose = () => setAnchorEl(null);

  return (
    <Paper
      elevation={12}
      sx={{
        width: { xs: "90%", md: "75%" },
        height: { xs: "90%", md: "75%" },
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        position: "relative",
      }}
    >

      <Box
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={1}
        borderColor="divider"
        flexShrink={0}
      >
        <Typography variant="h6">
          {userCtx?.roomId}
        </Typography>

        <Box display="flex" gap={1}>

          <Button
            variant="outlined"
            startIcon={<PeopleIcon />}
            onClick={handleUsersClick}
          >
            Users ({hubCtx?.connectedUsers.length})
          </Button>

          <Button variant="outlined" color="error" onClick={() => leaveRoom()}>
            Leave Room
          </Button>
        </Box>

        <Menu anchorEl={anchorEl} open={open} onClose={handleUsersClose}>

          {hubCtx?.connectedUsers.map((item, index) => (
            <MenuItem key={`user_${index}`}>{item}</MenuItem>
          ))}
        </Menu>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 40,
            background:
              "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0))",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />


        {hubCtx?.messages.map((item, index) => (
          <MessageItem key={index} msg={item} />
        ))}

        <div ref={messagesEndRef} />
      </Box>

      <SendMessage onSendMessage={onSendMessage} />

    </Paper>
  );
}
