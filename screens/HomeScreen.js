import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import  Header  from '../components/Header'
import Stories from '../components/Stories'
import Posts from '../components/Posts'
import Post from '../components/Post'
import PlusModal from '../components/PlusModal'

const HomeScreen = () => {
   const navigation = useNavigation()
  return (

    <View style={styles.container}>
      <Header/>

       <ScrollView>
        <Stories />
        <Posts/>
        <PlusModal />
        </ScrollView> 
     
      {/* <Button title='Go To Chat' onPress={() => navigation.navigate('Chat')}/> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
   marginTop: 40,
  },
});

export default HomeScreen