import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import { useForm } from '../hooks/useForm';
import { theme } from '../theme/theme';

export const LoginScreen = () => {

    const { login, authState: { error } } = useContext( AuthContext )

    const { formState, onChange } = useForm({
        userName: '',
        password: ''
    });

    const handleLogin = async () => {
        login(formState)
    }
    
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Login</Text>
            <View style={ styles.inputContainer }>
                <TextInput
                    placeholder='Nombre de usuario'
                    style={ styles.input }
                    placeholderTextColor='rgba(255,255,255,0.40)'
                    value={ formState.userName }
                    onChangeText={ text => onChange(text, 'userName') }
                />

                <TextInput
                    placeholder='Contraseña'
                    style={ styles.input }
                    placeholderTextColor='rgba(255,255,255,0.40)'
                    value={ formState.password }
                    onChangeText={ text => onChange(text, 'password') }
                />

                {error && <Text>{ error }</Text>}
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={ styles.button }
                onPress={ handleLogin }
            >
                <Text style={ styles.buttonText }>Ingresar</Text>
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
        height: 50
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