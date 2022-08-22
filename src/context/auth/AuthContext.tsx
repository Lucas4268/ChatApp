import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ChatContext } from "../chat/ChatContext";
import { fetchAPI } from "../../helpers/fetchAPI";
import { getMessages } from "../../services/getMessages";
import { User } from "../../interfaces/interfaces";
import { notification } from "../../helpers/notification";


interface AuthContextProps {
    loading: boolean,
    authState: AuthState,
    login: ( data: any ) => void,
    verifyToken: () => void
}

interface AuthState {
    logged: boolean,
    user: User | null,
    error: string | null
}


const initialState: AuthState = {
    logged: false,
    user: null,
    error: null
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [ authState, setAuthState ] = useState(initialState);
    const [ loading, setLoading ] = useState(false);
    const { dispatch } = useContext( ChatContext )


    const login = async ( data: any ) => {
        setLoading( true );
        
        const res = await fetchAPI('auth/login', { ...data }, 'POST');
        
        if (!res.ok) {
            setAuthState({
                logged: false,
                user: null,
                error: res.msg
            })
            setLoading( false );
            return
        }

        await AsyncStorage.setItem('token', res.token)

        const resp = await getMessages( res.token )
        if (resp.ok) {
            dispatch({
                type: 'set-messages',
                payload: resp.messages
            })
        }

        setAuthState({
            logged: true,
            user: res.user,
            error: null
        })
        setLoading( false )
    }



    const verifyToken = useCallback(async() => {
        setLoading( true )
        const token = await AsyncStorage.getItem('token') || undefined

        if (!token) {
            setAuthState({
                logged: false,
                user: null,
                error: 'No se encontro token.'
            })
            setLoading( false )
            return false
        }

        const res = await fetchAPI('auth/renew', null, 'GET', token);
        if (!res.ok) {
            setAuthState({
                logged: false,
                user: null,
                error: res.msg
            })
            setLoading( false );
            return false
        }

        await AsyncStorage.setItem('token', res.token)

        const resp = await getMessages( res.token )
        
        if (resp.ok) {
            dispatch({
                type: 'set-messages',
                payload: resp.messages
            })
        }

        setAuthState({
            logged: true,
            user: res.user,
            error: null
        })
        setLoading( false )
        return true
    }, [])


    return (
        <AuthContext.Provider value={{
            loading,
            authState,
            verifyToken,
            login
        }}>
            { children }
        </AuthContext.Provider>
    )
}