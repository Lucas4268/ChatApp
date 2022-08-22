import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSocket = ( serverPath: string ) => {

    const [ socket, setSocket ] = useState<Socket | null>(null);
    const [ online, setOnline ] = useState(false);
    
    const connectSocket = useCallback( async() => {
        const token = await AsyncStorage.getItem('token')

        const socketTemp = io( serverPath, {
            path: '/my-custom-path-elmpa/',
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        setSocket( socketTemp );
        
    }, [])

    const disconnectSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);

    
    useEffect(() => {
        socket?.on('disconnect', () =>{ 
            console.log('DISCONNECT')
            setOnline( false )});
    }, [ socket ])

    useEffect(() => {
        socket?.on('connect', () => {
            console.log('CONNECT')
            setOnline( true )});
    }, [ socket ])


    return {
        socket,
        online,
        connectSocket,
        disconnectSocket
    }
};
