import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { ItemChat } from '../components/ItemChat';
import { theme } from '../theme/theme';
import dayjs from 'dayjs';
import { getMessageDate } from '../helpers/getMessageDate';
import { User } from '../interfaces/interfaces';
import { useOrderUsers } from '../hooks/useOrderUsers'

export const HomeScreen = ( { navigation }: any) => {
    const { chatState } = useContext( ChatContext )
    const { authState } = useContext( AuthContext )
    
    const usersOrderDate = useOrderUsers( chatState )
    
    const handleClick = ( uid: string ) => {
        navigation.navigate('ChatScreen', { uid })
    }
    
    console.log('Render')

    return (
        <ScrollView>
            <StatusBar backgroundColor={ theme.colors.primary } />
            {
                // chatState.users.map( user => {
                usersOrderDate.map( user => {
                    if (user.uid !== authState.user?.uid) {
                        const lastMessageDate = !!chatState?.messages[user.uid!] ? dayjs(chatState?.messages[user.uid!][0]?.createdAt) || null : null
                        
                        const date = getMessageDate( lastMessageDate )
                        // console.log(user)
                        return (
                            <ItemChat key={ user.uid } handleClick={ () => handleClick(user.uid!) }>
                                <ItemChat.Img img={ user.img }/>
        
                                <ItemChat.Text name={ user.name } text={ (chatState?.messages[user.uid!]) ? chatState?.messages[user.uid!][0]?.message : '' }/>
        
                                <ItemChat.Info text={ date } />
                            </ItemChat> 
                        )
                    }
                })
            }

            <TouchableOpacity
                onPress={ async() => await AsyncStorage.removeItem('token') }
            >
                <Text>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
