import { useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';
import { Message } from '../models/Message';

interface ChatsProps {
  connection: HubConnection
}

const Chats = (props: ChatsProps) => {

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    props.connection.on("ReceiveMessage", (user, message) => {
      setMessages(messages => [...messages, { username: user, message }]);
    });
  }, [props.connection]);


  return (
    <div>
      Chats are active
    </div>
  )
}

export default Chats