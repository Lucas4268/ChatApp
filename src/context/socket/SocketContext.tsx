import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { AppState } from "react-native";
import { Socket } from "socket.io-client";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../chat/ChatContext";
import { useSocket } from "../../hooks/useSocket";


interface SocketContextProps {
    socket: Socket | null
}

export const SocketContext = createContext({} as SocketContextProps);

export const SocketProvider = ({ children }: { children: any }) => {
    const { dispatch } = useContext( ChatContext )
    const { authState: { logged, user }, loading } = useContext( AuthContext )
    const { socket, connectSocket, disconnectSocket } = useSocket('http://192.168.1.108:4055');
    // const { socket, connectSocket, disconnectSocket } = useSocket('https://powerful-tor-71495.herokuapp.com');


    useEffect(() => {
        if (AppState.currentState === 'active' && logged) {
            connectSocket()
        }
    }, [ connectSocket, logged ])

    useEffect(() => {
        const event = AppState.addEventListener('change', state => {
            if (state !== 'active' || !logged) {
                socket?.emit('is-disconnect')
            }

            if (state === 'active' && logged) {
                connectSocket()
            }
        })

        return () => {
            event.remove()
        }
    }, [ logged, AppState, socket, connectSocket, disconnectSocket, loading ])


    useEffect(() => {
        socket?.on('list-users', users => {
            dispatch({
                type: 'set-users',
                payload: users
            })
        })
    }, [ socket ])

    useEffect(() => {
        socket?.on('personal-message', (message) => {
            dispatch({
                type: 'new-message',
                payload: {
                    message,
                    uid: (message.from._id === user?.uid) ? message.to.toString() : message.from._id.toString(),
                }
            })
            
            if (message.from._id !== user?.uid && !message.received) {
                socket.emit('message-received', { messageId: message._id, fromId: message.from._id })
            }
        })
    }, [ socket ])
        
    useEffect(() => {
        socket?.on('message-received', ({ messageId, to}) => {
            dispatch({
                type: 'message-received',
                payload: {
                    messageId,
                    uid: to,
                }
            })
        })

    }, [ socket ])

    return (
        <SocketContext.Provider value={{ socket }}>
            { children }
        </SocketContext.Provider>
    )
}