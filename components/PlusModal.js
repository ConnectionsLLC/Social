import { View, Text, Modal } from 'react-native'
import React from 'react'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

const PlusModal = () => {
  return (
    <View style={{height: 20}}>
    

       <View style={{flex: 1, backgroundColor: "white", justifyContent: "flex-end", height: 10 }}>
                  <Text>Hello I am the modal Components</Text>
       </View>
      
    </View>
  )
}

export default PlusModal