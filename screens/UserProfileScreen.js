import React from "react";
import Header from "../components/Header";
import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import useAuth from "../hooks/useAuth";
import {
  onSnapshot,
  query,
  doc,
  collection,
  where,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import EditProfile from "../components/EditProfile";
import { useRoute } from "@react-navigation/native";
import { validate } from "email-validator";


const UserProfileScreen = () => {
  const route = useRoute();
  const { username, lowerUsername, profile, uid, email } =
    route.params;
  const { user } = useAuth();
  const navigation = useNavigation();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState(false);
  const [currentFollowing, setCurrentFollowing] = useState([]);
  const [hasFollowed, setHasFollowed] = useState(false)
  const [userInfo, setUserInfo] = useState([]);


  onSnapshot(
    query(
      collection(firebase.firestore(), "users"),
      where("owner_uid", "==", user.uid)
    ),
    (snapshot) => {
      setUserInfo(snapshot.docs);
    }
  );

  useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', email, 'followers'), (snapshot) =>
  setFollowers(snapshot.docs)), [firebase,email]
)
useEffect(() => onSnapshot(collection(firebase.firestore(), 'users', email, 'following'), (snapshot) =>
setFollowing(snapshot.docs)), [firebase,email]
)
  useEffect(() => {
    setHasFollowed(followers.findIndex(follower => follower.id === user.email) !== -1)
}, [followers])

  const followUser = async () => {
      
    if (hasFollowed && uid != user.uid) {
        await deleteDoc(doc(firebase.firestore(), 'users', email, 'followers', user.email))
        await deleteDoc(doc(firebase.firestore(), 'users', user.email, 'following', email))
        setHasFollowed(false)
    } else {

       
          await setDoc(doc(firebase.firestore(), 'users', email, 'followers', user.email), {
           uid: user.uid
         });
      
        await setDoc(doc(firebase.firestore(), 'users', user.email, 'following', email), {
           uid: user.uid
        });
       
    }
    
};


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ position: "absolute", zIndex: 999 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 8,
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 20,
            padding: 4,
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ fontSize: 18, color: "white" }}>{username}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Image
            style={{ alignSelf: "stretch", height: 200, marginBottom: 8 }}
            source={{
              uri: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            }}
          />

          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              top: 150,
              position: "absolute",
              zIndex: 99,
              left: 15,
            }}
            source={{ uri: profile }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 12,
            }}
          >
            {user.uid == uid && (
              <Text
                style={{
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 6,
                  fontWeight: "600",
                }}
                onPress={() => navigation.navigate("EditProfile")}
              >
                Edit Profile
              </Text>
            )}

            {hasFollowed ? (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 6,
                  fontWeight: "600",
                }}
                onPress={followUser}
              >
                <Text>Following</Text>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 6,
                  fontWeight: "600",
                }}
                onPress={followUser}
              >
                <Text>Follow</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            borderBottomColor: "grey",
            borderBottomWidth: 0.5,
          }}
        >
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>{username}</Text>
            <Text style={{ fontSize: 13, fontWeight: "300" }}>
              {lowerUsername}
            </Text>
            <Text>The chief and the developer of this application </Text>

            {/* <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <Ionicons name="ios-location-sharp" size={24} color="black" />
                    <Text style={{ color: 'light-blue' }}>Hong-Kong</Text>
                  </View> */}

            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <Ionicons name="calendar-sharp" size={20} color="black" />
              <Text style={{ color: "light-blue", marginleft: 2 }}>
                {" "}
                Joined On December 2022
              </Text>
            </View>

            <View
              style={{ marginTop: 10, marginBottom: 10, flexDirection: "row" }}
            >
              <View style={{ flexDirection: "row", marginRight: 4 }}>
                <Text style={{ fontWeight: "600", marginRight: 2 }}>{followers.length}</Text>
                <Text>Followers</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "600", marginRight: 2 }}>{following.length}</Text>
                <Text>Following</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", marginTop: 4 }}></View>
        </View>
      </View>
    </View>
  );
};

export default UserProfileScreen;
