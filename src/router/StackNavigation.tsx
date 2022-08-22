import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/auth/AuthContext';
import { ChatScreen } from '../screens/ChatScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoaderScreen } from '../screens/LoaderScreen';
import { PublicStack } from './PublicStack';
import { theme } from '../theme/theme';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
    const { authState, loading, verifyToken } = useContext( AuthContext );

    useEffect(() => {
        verifyToken()
    }, [ verifyToken ])

    if (loading) return <LoaderScreen />

    return (
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={{
                title: 'ChatApp',
                headerStyle: {
                    backgroundColor: theme.colors.primary
                },
                headerTintColor: '#fff',
                contentStyle: {
                    backgroundColor: theme.colors.secondary
                }
            }}
        >
            {
                !authState?.logged ? (
                    <>
                        <Stack.Screen name="PublicStack" component={ PublicStack } options={{headerShown: false}} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="HomeScreen" component={ HomeScreen } />
                        <Stack.Screen name="ChatScreen" component={ ChatScreen } options={{headerShown: false}} />
                    </>
                )
            }
        </Stack.Navigator>
    );
}
