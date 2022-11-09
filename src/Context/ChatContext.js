import { useState, createContext } from 'react'

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [To, setTo] = useState({id:'',username:''});

    return (
        <ChatContext.Provider value={{ To, setTo }}>
            {children}
        </ChatContext.Provider>
    );
}
export { ChatContext, ChatProvider }