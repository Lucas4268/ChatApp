import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme/theme';

export const RegisterScreen = () => {
    
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Registro</Text>

            <View style={ styles.inputContainer }>
                <TextInput
                    placeholder='Nombre'
                    style={ styles.input }
                    placeholderTextColor='rgba(255,255,255,0.40)'
                />

                <TextInput
                    placeholder='Teléfono'
                    style={ styles.input }
                    placeholderTextColor='rgba(255,255,255,0.40)'
                    keyboardType='number-pad'
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={ styles.button }
            >
                <Text style={ styles.buttonText }>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },

    title: {
        color: '#fff',
        fontSize: 30,
        marginVertical: 100
    },

    inputContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 29,
        color: '#fff',
        fontSize: 18,
        marginVertical: 20,
        paddingHorizontal: 20,
        width: 250,
    },

    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 50,
        marginVertical: 100,
        paddingHorizontal: 50,
        paddingVertical: 15,
    },

    buttonText: {
        color: '#fff',
        fontSize: 17,
    }
})