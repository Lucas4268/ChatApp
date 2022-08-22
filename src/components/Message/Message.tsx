import dayjs from "dayjs"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

import { AuthContext } from "../../context/auth/AuthContext"
import { User } from "../../interfaces/interfaces"
import { theme } from "../../theme/theme"


interface Props { 
    message: string,
    from: User,
    createdAt: string,
    _id: string,
    received: boolean
}


export const Message = ({ message, from, createdAt, _id, received }: Props) => {
    const { authState: { user } } = useContext( AuthContext )

    const messageFrom = (from._id === user?.uid)

    return (
        <View style={{
            ...styles.messageContainer,
            alignSelf: messageFrom ? 'flex-end' : 'flex-start',
            backgroundColor: messageFrom ? theme.colors.primary : '#666',
            borderBottomEndRadius: messageFrom ? 0 : undefined,
            borderBottomStartRadius: !messageFrom ? 0 : undefined
        }}>
            <Text style={ styles.text }>{ message } </Text>
            <Text style={ styles.date }>
                { dayjs(createdAt).add(3, 'hour').format('HH:mm') } {''}
                {   
                    (messageFrom) 
                    &&
                    <Icon 
                        name={
                            !received 
                                ? (_id.split('-')[0] === 'messageTemp')
                                    ? 'time-outline'
                                    : 'checkmark-outline'
                                : 'checkmark-done-outline'
                        }
                        color='#aaa'
                        size={13}
                    />
                }
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    messageContainer: {
        alignSelf: 'flex-start',
        borderRadius: 12,
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10,
        maxWidth: '80%',
        minWidth: 0,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },

    text: {
        color: '#fff',
        fontSize: 16,
        maxWidth: '85%',
    }, 
    
    date: {
        alignSelf: 'flex-end',
        color: '#aaa',
        fontSize: 10,
        marginBottom: -5,
        marginLeft: 7,
    }
})