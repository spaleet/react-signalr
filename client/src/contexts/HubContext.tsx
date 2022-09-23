import { HubConnection } from "@microsoft/signalr";
import { createContext, ReactNode, useState, useEffect } from "react";
import { Message } from "../models/Message";
import { buildConnection, startConnection } from '../utils/hubUtils';

interface IHubContext {
    connection?: HubConnection
    setConnection: (connection: HubConnection) => void;

    messages: Message[]
    setMessages: (messages: Message[]) => void;

    connectionStarted: boolean
}

export const HubContext = createContext<IHubContext | null>(null)

export const HubContextProvider = ({ children }: { children: ReactNode }) => {

    const [connection, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<Message[]>([]);
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
            console.log("not null");

            startConnection(connection)
                .then(() => {
                    setConnectionStarted(true)
                    connection.on("ReceiveMessage", (username, message) => {
                        setMessages(messages => [...messages, { username, message }]);
                    });

                    connection.onclose(() => {
                        startNewConnection();
                    });
                });
        }
    }, [connection]);

    return (
        <HubContext.Provider value={{ connection, setConnection, connectionStarted, messages, setMessages }}>
            {children}
        </HubContext.Provider>
    );
}