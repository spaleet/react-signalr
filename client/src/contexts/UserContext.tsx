import { createContext, ReactNode, useState } from "react";

interface IUserContext {
    username: string;
    setUsername: (username: string) => void;
    roomId: string;
    setRoomId: (username: string) => void;
}

export const UserContext = createContext<IUserContext | null>(null)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");

    return (
        <UserContext.Provider value={{ username, setUsername, roomId, setRoomId }}>
            {children}
        </UserContext.Provider>
    );
}