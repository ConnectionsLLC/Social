import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import LoginForm from '../components/LoginForm'
import { useNavigation } from '@react-navigation/native'
import SignupForm from '../components/SignupForm'

const SignupScreen = () => {
    
    const navigation = useNavigation()
  return (
      <View style={styles.container}>
          <View style={styles.logoContainer}>
              <Image style={styles.logo} source={{ uri: 'https://th.bing.com/th/id/OIP.RGtyrKrZXMSgWoXXyhW9CgHaFH?pid=ImgDet&rs=1', height: 100, width: 150 }} />

          </View>
          <SignupForm navigation={navigation}/>
      </View>
  )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddintHorizontal: 12,

    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,

    }
})

export default SignupScreen