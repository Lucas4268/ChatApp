import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { theme } from '../theme/theme';

const Stack = createNativeStackNavigator();


export const PublicStack = () => {
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
            <Stack.Screen name="LoginScreen" component={ LoginScreen } options={{headerShown: false}} />
            <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
        </Stack.Navigator>
    );
};
