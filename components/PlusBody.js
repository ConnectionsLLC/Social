import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, ImagePickerIOS } from 'react-native'
import React, {useState, useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '.././firebase';
import { onSnapshot, query, doc, collection, where, updateDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import {uploadBytes, ref} from 'firebase/storage'

const PlusBody = () => {
  const navigation = useNavigation()
  const { user } = useAuth()

  const [text, onChangeText] = useState("");
  const [userInfo, setUserInfo] = useState([])

  const [image, setImage] = useState(null);

const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(image.fileName)
    }
  };

useEffect(() => {
  firebase.firestore().collection('users')
  .where('owner_uid',"==", user.uid).limit(1).onSnapshot(
    snapshot => snapshot.docs.map(doc => {
      setUserInfo({
        username: doc.data().username, 
        profilePicture: doc.data().profile_picture,
        lowerUsername: doc.data().lowerUsername, 
      
      })
    })
  )
},[])


const SubmitPost = async () => {
if(image){
const imageRef = ref(firebase.storage(), `images/${image}`)
 uploadBytes(imageRef, image).then(() => {
  console.log("Image Uploaded!")
 })
}

 const upload = await firebase.firestore().collection("users").doc(user.email).collection('posts').add({
  username: userInfo.username,
   profilePicture: userInfo.profilePicture,
   owner_uid: user.uid, 
   posttext: text, 
   createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
   likes: 0,
likes_by_users: [],
comments: [],
  lowerUsername: "@" + userInfo.username.replace(/\s+/g,'').toLowerCase(),
 })

 
 console.log("ImageUploaded!")

navigation.goBack()
 onChangeText("")
}



  return (
    
    <View  style={{backgroundColor: 'white',}}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Pressable style={styles.button} onPress={SubmitPost}>
          <Text style={styles.buttonText} >Post</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <View style={{marginRight: 10}}>
          <Image style={{ width: 35, height: 35, borderRadius: 50, marginLeft: 4, }} source={{ uri: 'https://lh3.googleusercontent.com/a/AItbvmld8x4l-U0o2L28Ipg6VMny5NvPVM0sOjiqjlT8=s96-c' }} />
        </View>
        <View>
         
          {/* <Text style={{fontWeight: '600', fontSize: 16, marginBottom: 4}}>Aniket Mishra</Text> */}
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <View style={{ flexDirection: 'row', borderWidth: 1,borderColor: '#0096F6' ,borderRadius: 21, paddingLeft: 6, paddingRight: 2, paddingBottom: 2, width: 80, justifyContent: 'center' }}>
              <Text style={{fontSize: 12, fontWeight: '600', color: '#0096F6'}}>Everyone</Text>
              <Ionicons name="chevron-down" size={16} color="#0096F6" style={{ marginLeft: 2 }} />
            </View>
            
          </TouchableOpacity>
        </View>
      </View>

      <View>
      <View>
          <TextInput
            style={styles.input}            
            value={text}
            onChangeText={onChangeText}
            placeholder="Say Something..."
            multiline={true}
            
          />
          <View style={{ flexDirection: "row", margin: 12}}>
            <Ionicons name="ios-globe-outline" size={16} color="#0096F6" style={{ marginLeft: 2 }} />
            <Text style={{ color: '#0096F6', marginLeft: 2, alignItems: 'center', marginBottom: 4, fontWeight: '600' }}>Everyone can reply</Text>
                 </View>
             <View style={{margin: 12, flexDirection: 'row'}}>
                 <TouchableOpacity onPress={uploadImage}>
              <MaterialIcons name="image" size={24} color="#0096F6" style={{marginLeft: 2}}/>
               </TouchableOpacity>
            <TouchableOpacity >
              <MaterialIcons name="poll" size={24} color="#0096F6" style={{marginLeft: 10}}/>
</TouchableOpacity>
            <TouchableOpacity >
              <MaterialIcons name="emoji-emotions" size={24} color="#0096F6" style={{marginLeft: 10}}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="my-location" size={24} color="#0096F6" style={{marginLeft: 10}}/>
            </TouchableOpacity>
          </View>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 12,

    },
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
profile : {
  width: 40, 
  heigth: 40, 
  borderRadius: 50,
}, 
  input: {
    height: 280,
    margin: 12,
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'top'
  },


});



export default PlusBody