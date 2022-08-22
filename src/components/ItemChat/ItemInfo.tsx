import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ItemInfo = ({ text }: { text: string }) => {
    return (
        <View style={ styles.infoChat }>
            <Text style={ styles.info }>{ text }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoChat: {
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    
    info: {
        color: '#aaa',
        fontSize: 12
    }
})