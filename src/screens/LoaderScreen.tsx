import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { theme } from "../theme/theme"


export const LoaderScreen = () => {
    return (
        <View style={ styles.algo }>
            {/* <Text>Loading</Text> */}
            <ActivityIndicator size={ 50 }/>
        </View>
    )
}

const styles = StyleSheet.create({
    algo: {
        backgroundColor: theme.colors.secondary,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
