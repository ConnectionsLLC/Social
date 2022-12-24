import React from 'react'
import Header from '../components/Header'
import { View, Text, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import firebase from '../firebase';
import useAuth from '../hooks/useAuth'
import { onSnapshot, query, doc, collection, where } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import EditProfile from '../components/EditProfile';


const EditProfile = () => {
    const { user } = useAuth()
    const [userInfo, setUserInfo] = useState();
    const navigation = useNavigation()
    
    onSnapshot(query(collection(firebase.firestore(), 'users'), where("owner_uid", "==", user.uid)),
        snapshot => {
            setUserInfo(snapshot.docs)


        }
    )


  return (
     <View>
          <View style={styles.container1}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Pressable style={styles.button}>
                  <Text style={styles.buttonText} >Save</Text>
              </Pressable>
          </View>
          <View>
            
          </View>
     </View>
  )
}
const styles = StyleSheet.create({
    container1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 10,

    },
    button: {
        backgroundColor: '#0096F6',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 32,
        borderRadius: 24,
        width: 64,
    },
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16,

    },
})
export default EditProfile