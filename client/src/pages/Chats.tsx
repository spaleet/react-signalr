import { HubConnectionState } from '@microsoft/signalr';
import { useEffect } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';

interface ChatsProps {
  connection: HubConnection
}


const Chats = (props: ChatsProps) => {

  useEffect(() => {
    props.connection.on("ReceiveMessage", (user, message) => {
      console.log("Message Received: ", message);
    });
  }, [props.connection]);


  return (
    <div>
      Chats are active
    </div>
  )
}

export default Chats