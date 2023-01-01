import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import Message from '../components/Message';


const ChatNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
      
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={Message}  />
            
    </Stack.Navigator>
  )
}

export default ChatNavigation