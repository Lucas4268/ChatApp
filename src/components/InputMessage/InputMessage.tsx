import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../context/auth/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';
import { SocketContext } from '../../context/socket/SocketContext';
import { theme } from '../../theme/theme';


export const InputMessage = ({ to }: { to?: string }) => {
    const { socket } = useContext( SocketContext )
    const { authState: { user } } = useContext( AuthContext )
    const { dispatch } = useContext( ChatContext )
    const [ message, setMessage ] = useState('')

    const handleSend = () => {
        if (!message.trim()) return
        const messageTemp = {
            _id: `messageTemp-${ dayjs( new Date() ) }`,
            message,
            from: {
                _id: user?.uid
            },
            to,
            createdAt: dayjs( new Date() ),
        }
        
        dispatch({
            type: 'new-message',
            payload: {
                message: messageTemp ,
                uid: to
            }
        })
        // setTimeout(() => {
        socket?.emit('personal-message', {
            from: user?.uid,
            to,
            message: message.trim(),
        })
        // }, 1000)
        setMessage('')
    }

    return (
        <View style={ styles.inputContainer }>
            <TextInput
                style={ styles.input }
                placeholder='Mensaje'
                placeholderTextColor='#888'
                value={ message }
                onChangeText={ text => setMessage(text) }
                multiline
            />
            
            <TouchableOpacity
                activeOpacity={ .9 }
                style={ styles.sendButton }
                onPress={ handleSend }
            >
                <Icon name='send' color='#fff' size={ 22 }/>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    inputContainer: {
        minHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        bottom: 7,
    },

    input: {
        marginHorizontal: 10,
        borderRadius: 30,
        color: '#fff',
        // paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 20,
        backgroundColor: theme.colors.primary,
        // marginVertical: 10,
        flex: 1,
        minHeight: 50,
        maxHeight: 120,
    },

    sendButton: {
        backgroundColor: theme.colors.primary,
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        elevation: 5
    },

    sendText: {
        color: '#fff'
    }
})
