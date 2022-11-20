import { View, Text, Image } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './screens/SignupScreen';
import Ionicons from '@expo/vector-icons/Ionicons';


const Stack = createBottomTabNavigator();
const Stack2 = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth()
  
  
  return (

    
   
          <Stack.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarBackground: () => (
        //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        // ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
              iconColor = focused
              ? 'blue'
              : "black"
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
            iconColor = focused
              ? 'blue'
              : "black"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={iconColor} />;
          ;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
            {user ? (
              <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          </>
            ) : (
              <>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Signup" component={SignupScreen}/>
          </>
          )}
          </Stack.Navigator>
   
  )
}

export default StackNavigator