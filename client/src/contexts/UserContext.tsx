import { createContext, useState } from "react";

interface IUserContext {
    username: string;
    setUsername: (username: string) => void;
}

export const UserContext = createContext<IUserContext | null>(null)

export const UserContextProvider = ({ children }: { children: any }) => {
    const [username, setUsername] = useState("");

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
}