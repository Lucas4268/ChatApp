import React from "react"
// import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import { useSafeAreaInsets } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/Ionicons'

import { User } from "../../interfaces/interfaces"
import { theme } from "../../theme/theme"


export const HeaderChat = ( user: User, navigation: NativeStackNavigationProp<any, any> ) => {
    // const { top } = useSafeAreaInsets()
    return ( 
        <SafeAreaView style={{backgroundColor: theme.colors.primary}}>
            <View style={{ ...styles.header }}>
            {/* <View style={{ ...styles.header, paddingTop: top - 5, height: 70 + top }}> */}
                <TouchableOpacity
                    onPress={ () => navigation.goBack() }
                >
                    <Icon name="arrow-back-outline" size={ 30 } color='#fff'/>
                </TouchableOpacity>

                <View style={ styles.avatar }>
                    <Image source={{uri: user.img}} style={{width: 50, height: 50}}/>
                </View>

                <View style={ styles.nameContainer }>
                    <Text style={ styles.name }>{ user.name }</Text>

                    { user.online && <Text style={ styles.onLine }>En linea</Text> }
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.primary,
        // backgroundColor: 'red',
        flexDirection: 'row',
        height: 70,
        alignItems: 'center'
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        overflow: 'hidden'
    },

    nameContainer: {
        flexDirection: 'column'
    },

    name: {
        color: '#fff',
        fontSize: 19,
    },

    onLine: {
        color: '#aaa'
    }
})