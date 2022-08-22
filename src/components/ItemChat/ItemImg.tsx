import React from "react"
import { Image, StyleSheet, View } from "react-native"

interface Props {
    img?: string
}

export const ItemImg = ({ img }: Props) => {
    return (
        <View style={ styles.avatar }>
            {
                img
                    ?
                <Image style={ styles.img } source={{ uri: img }}/>
                    :
                <Image style={ styles.img } source={ require('../../assets/user-image.png') }/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 15,
        overflow: 'hidden'
    },

    img: {
        width: 60,
        borderRadius: 30,
        height: 60,
        backgroundColor: '#ccc'
    }
})