import React, { createContext, useReducer } from "react"
import { chatReducer } from "./chatReducer"
import { Message, User } from "../../interfaces/interfaces"

interface Messages {
    [key: string]: Message[]
}

export interface ChatContextState {
    uid: string,
    users: User[],
    messages: Messages
}

interface ChatContextProvider {
    chatState: ChatContextState,
    dispatch: React.Dispatch<any>
}

const initialState: ChatContextState = {
    uid: '',
    users: [],
    messages: {}
}

export const ChatContext= createContext({} as ChatContextProvider)

export const ChatProvider = ({ children }: { children: JSX.Element }) => {
    
    const [chatState, dispatch] = useReducer(chatReducer, initialState);
    
    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            { children }
        </ChatContext.Provider>
    )
}