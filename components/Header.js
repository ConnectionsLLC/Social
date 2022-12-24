import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
// import { Navigation } from 'react-feather';
import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';

// import  PlusIcon  from "react-native-heroicons/outline";

const Header = () => {
  const navigation = useNavigation()
  const route = useRoute();
  


  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <TouchableOpacity>
          {/* <Image style={styles.logo} source={{ uri: 'https://th.bing.com/th/id/R.cd2b3b973a2d0abae68440b004408162?rik=sK9pHDx0a7m7jg&riu=http%3a%2f%2f2.bp.blogspot.com%2f-4pBaE9sDqjg%2fUYNzlT_tL9I%2fAAAAAAAAZck%2fPhzqPJx3le8%2fs1600%2fInstragram%2blogo.png&ehk=ZOXB2HBBimcrm%2fakCFvwsTMuHJbNdmNGO57a%2bem5nlc%3d&risl=&pid=ImgRaw&r=0' }} /> */}
          <Text style={{ fontSize: 20, fontWeight: '500', }}>{route.name}</Text>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Plus')}>
            <Image style={styles.icon} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pentagon-89b4a.appspot.com/o/plus.png?alt=media&token=2c7450d4-d140-41cb-a20c-42a269734af2' }} />
            {/* <PlusIcon/> */}
            {/* <Camera/> */}
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>12</Text>
            </View>
            <Image style={styles.icon} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pentagon-89b4a.appspot.com/o/message.png?alt=media&token=c57601d4-3950-4dcb-84b8-6f85bd67c6d6' }} />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 8,
    

  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 32,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 20,
    bottom: 14,
    width: 21,
    height: 15,
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
});

export default Header