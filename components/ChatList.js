import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ChatList = () => {
  const navigation = useNavigation()

  return (
    <View style={{ marginTop: 10, margin: 2 }}>
     <TouchableOpacity onPress={() => navigation.navigate('Message')}>
     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }} >
        <View>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 4 }}
            source={{ uri: 'https://th.bing.com/th/id/OIP.0HPHOhiMHVdQGlxYc4z86AHaFj?pid=ImgDet&rs=1' }}
          />
        </View>
        <View style={{ marginLeft: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, fontStyle: 'bold' }}>Elon Musk</Text>
            {/* <Text style={{fontSize: 13, color: 'grey', marginLeft: 4}}>@elonmusk</Text> */}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: 'grey' }}>Hey elon here, what about making...  </Text>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>1</Text>
            </View>
            <Text style={{ fontSize: 13, }}>  9:45 PM</Text>
          </View>
        </View>
      </View>
     </TouchableOpacity>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({
  unreadBadge: {
    backgroundColor: '#FF3250',
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10
  }
})