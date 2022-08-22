import React from "react"
import { StyleSheet, Text, View } from "react-native"

interface Props {
    name: string,
    text?: string
}

export const ItemText = ({ name, text }: Props) => {
    return (
        <View style={ styles.textContainer }>
            <Text style={ styles.name } >{ name }</Text>
            { !!text && <Text style={ styles.message } >{ text }</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },

    name: {
        fontSize: 20,
        marginTop: 10,
        color: '#fff'
    },
    
    message: {
        color: '#ccc',
        marginTop: 5
    }
})
