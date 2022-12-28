
import React from 'react'
import Header from '../components/Header'
import { View, Text, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import  { useEffect, useState } from 'react'
import firebase from '../firebase';
import useAuth from '../hooks/useAuth'
import { onSnapshot, query, doc, collection, where } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import EditProfile from '../components/EditProfile';

const ProfileScreen = () => {
    const { user } = useAuth()
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation()
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  onSnapshot(query(collection(firebase.firestore(), 'users'), where("owner_uid", "==", user.uid)),
    snapshot => {
      setUserInfo(snapshot.docs)


    }
  )
  useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', user.email, 'followers'), (snapshot) =>
  setFollowers(snapshot.docs)), [firebase,user]
)
useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', user.email, 'following'), (snapshot) =>
setFollowing(snapshot.docs)), [firebase, user]
)
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
      <Header />
        <View>
          <View>
            <Image style={{ alignSelf: "stretch", height: 200, marginBottom: 8 }} source={{ uri: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80' }} />

            {userInfo?.map(info => {
              return (
                <Image key={info.id} style={{ width: 100, height: 100, borderRadius: 100, top: 150, position: 'absolute', zIndex: 999, left: 15 }} source={{ uri: info.data().profile_picture }} />
              )
            })}

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 12 }}>

              <Text style={{ borderWidth: 1, borderRadius: 16, padding: 6, fontWeight: '600', }} onPress={() => navigation.navigate("EditProfile")}>Edit Profile</Text>
            </View>


          </View>
          <View style={{ marginTop: 40,borderBottomColor: 'grey', borderBottomWidth: 0.5 }}>

            {userInfo?.map(info => {
              return (
                <View style={{ marginLeft: 20,  }} key={info.id}>
                  <Text style={{ fontSize: 20, fontWeight: '600' }}>{info.data().username}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '300' }}>{info.data().lowerUsername}</Text>
                  <Text>The chief and the developer of this application </Text>

                  {/* <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <Text style={{ color: 'light-blue' }}>Hong-Kong</Text>
                  </View> */}

                  <View style={{ marginTop: 10, flexDirection: 'row',  }}>
                    <Ionicons name="calendar-sharp" size={20} color="black" />
                    <Text style={{ color: 'light-blue', marginleft: 2 }}> Joined On December 2022</Text>
                  </View>

                  <View style={{ marginTop: 10,marginBottom: 10, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', marginRight: 4 }}>
                      <Text style={{ fontWeight: "600", marginRight: 2 }}>{followers.length}</Text>
                      <Text>Followers</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: "600", marginRight: 2 }}>{following.length}</Text>
                      <Text>Following</Text>
                    </View>
                  </View>

                  

                </View>
              )
            })}

          </View>
          <View>
                    <View style={{flexDirection: 'row', marginTop: 4, }}>
                      

 
                    </View>
                  </View>
        </View>
    </View>
  )
}

export default ProfileScreen