import React from 'react';
import { LogBox, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/router/StackNavigation';
import { SocketProvider } from './src/context/socket/SocketContext';
import { AuthProvider } from './src/context/auth/AuthContext';
import { theme } from './src/theme/theme';
import { ChatProvider } from './src/context/chat/ChatContext';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export const App = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <View style={{ backgroundColor: theme.colors.secondary, flex: 1 }}>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </View>
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};