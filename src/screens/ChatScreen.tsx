import React, { useEffect, useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native-gesture-handler';
import { ChatContext } from '../context/chat/ChatContext';
import { HeaderChat } from '../components/HeaderChat/HeaderChat';
import { InputMessage } from '../components/InputMessage/InputMessage';
import { Message } from '../components/Message/Message';

interface Props extends NativeStackScreenProps<any, any>{}

export const ChatScreen = ({ route, navigation }: Props) => {
    const uid = route.params?.uid

    const { chatState: { messages, users } } = useContext( ChatContext )

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => HeaderChat( users.find( user => user.uid === uid)!, navigation ),
        })
    }, [ navigation, users ])
    
    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            keyboardVerticalOffset={ Platform.OS === 'ios' ? 100 : 85 }
        >
                <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <View>
                    <FlatList
                        data={ messages[uid] }
                        style={ styles.listMessage }
                        keyExtractor={ ({_id}) => _id }
                        inverted
                        renderItem={ ({ item }) => <Message {...item}/> }
                        ListHeaderComponent={ <View style={{ height: 100 }} /> }
                    />

                    <InputMessage to={ uid } />
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    listMessage: {
        height: '100%',
    }
})