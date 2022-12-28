import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const ChatScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        animated={true}

     
       />
      <Header/>
    </View>
  )
}

export default ChatScreen