import { HubConnection } from "@microsoft/signalr";
import { createContext, ReactNode, useState, useEffect } from "react";
import { Message } from "../models/Message";
import { buildConnection, startConnection } from '../utils/hubUtils';

interface IHubContext {
    connection?: HubConnection
    connectionStarted: boolean

    messages: Message[]
    connectedUsers: string[]
}

export const HubContext = createContext<IHubContext | null>(null)

export const HubContextProvider = ({ children }: { children: ReactNode }) => {

    const [connection, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
    const [connectionStarted, setConnectionStarted] = useState(false);

    const startNewConnection = () => {
        const newConnection = buildConnection();

        setConnection(newConnection);
    }

    useEffect(() => {
        startNewConnection();
    }, []);

    useEffect(() => {

        if (connection) {

            startConnection(connection)
                .then(() => {
                    setConnectionStarted(true)

                    connection.on("ReceiveMessage", (username, message) => {
                        setMessages(messages => [...messages, { username, message }]);
                    });
                    connection.on("ReceiveUsersInRoom", (connectedUsers) => {
                        setConnectedUsers(connectedUsers);
                    });
                    connection.onclose(() => {
                        startNewConnection();
                    });
                });
        }
    }, [connection]);

    return (
        <HubContext.Provider value={{ connection, connectionStarted, messages, connectedUsers }}>
            {children}
        </HubContext.Provider>
    );
}