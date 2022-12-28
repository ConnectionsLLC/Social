import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "../firebase";
import useAuth from "../hooks/useAuth";
import { onSnapshot, query, doc, collection, where } from "firebase/firestore";
import { FontAwesome5 } from "@expo/vector-icons";

const Post = ({ post }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();
  const [comments, setComments] = useState(false);
  const [text, onChangeText] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const [ReplyModal, setReplyModal] = useState(false);
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  



  onSnapshot(
    query(
      collection(firebase.firestore(), "users"),
      where("owner_uid", "==", user.uid)
    ),
    (snapshot) => {
      setUserInfo(snapshot.docs.map(info => info.data()));
    }
  );

  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(user.email);
    firebase
      .firestore()
      .collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(user.email)
          : firebase.firestore.FieldValue.arrayRemove(user.email),
      })
      .then(() => {
        console.log("document updated!");
      })
      .catch((e) => {
        console.error("Failed Updating DOcs", e);
      });
  };



  return (
    <View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={ReplyModal}
         
        >
          <View style={styles.centeredView} >
            <View style={styles.modalView}>
             <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => setReplyModal(false)}/>
          <Text style={{fontSize: 16, marginLeft: 4}}>Compose A Reply</Text>
             </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Text style={{fontSize: 13, marginLeft: 4}}>Replying to</Text>
           <Text style={{color: 'blue', fontSize: 14}}> @aniketmishra</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center',marginTop: 10, backgroundColor: '#cdcbd2', padding: 5, borderRadius: 8}}>
              <Feather name="smile" size={20} color="black" />
                <TextInput placeholder="Say Something...." style={{flex: 1, marginLeft: 8,marginRight: 8}}/>
                <Feather name="send" size={20} color="black" />
              </View>
            </View>
          </View>
        </Modal>
      <View style={{ borderBottomWidth: 1, borderColor: "#E2DCDC" }}>
        {/* <Divider width={1} orientaion="vertical"/> */}

        

        <PostHeader post={post} navigation={navigation} userInfo={userInfo} />
        <PostBody post={post} />
        <PostFooter
          post={post}
          handleLike={handleLike}
          user={user}
          comments={comments}
          setComments={setComments}
          text={text}
          onChangeText={onChangeText}
          setReplyModal={setReplyModal}
        />
       
      </View>
    </View>
  );
};
const PostHeader = ({ post, navigation , follower , following, userInfo }) => (
  <View
    style={{ justifyContent: "space-between", flexDirection: "row", margin: 5 }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
      <View>
        <Image
          style={{ width: 30, height: 30, borderRadius: 50, marginLeft: 4 }}
          source={{ uri: post.profilePicture }}
        />
      </View>
      <View>
        <Text
          style={{ marginLeft: 4, fontWeight: "600", fontSize: 14 }}
          onPress={() =>
            navigation.navigate("UserProfile", {
              username: post.username,
              lowerUsername: post.lowerUsername,
              profile: post.profilePicture,
              uid: post.owner_uid,
              follower: follower, 
              following: following,
              email: post.owner_email,
              
            })
          }
        >
          {post.username}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: 4, fontSize: 10 }}>
            {post.lowerUsername}
          </Text>
        </View>
      </View>
    </View>
    <View>
      <Text style={{ marginRight: 10, fontSize: 20 }}>...</Text>
    </View>
  </View>
);
const PostBody = ({ post }) => (
  <View>
    <View
      style={{
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "400" }}>{post.posttext} </Text>
    </View>
    <View>
      {post.image && (
        <Image
          style={{
            alignSelf: "stretch",
            height: 400,
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 10,
          }}
          source={{ uri: post?.image }}
        />
      )}
    </View>
    <View
      style={{
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        flexDirection: "row",
      }}
    >
      <Text style={{ color: "grey", fontStyle: "bold" }}>10:00 PM</Text>
      <Text> | </Text>
      <Text style={{ color: "grey" }}>24th December 2022</Text>
    </View>
  </View>
);
const PostFooter = ({
  post,
  handleLike,
  user,
  comments,
  setComments,
  text,
  onChangeText,
  userInfo,
  setReplyModal,
}) => (
  <View style={{ margin: 10 }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 18,
        marginRight: 18,
        
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() =>
          comments == true ? setComments(false) : setComments(true)
        }
      >
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Text style={{ marginLeft: 4, fontSize: 16 }}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setReplyModal(true)}>
        <Octicons name="reply" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => handleLike(post)}
      >
        {post.likes_by_users.includes(user.email) ? (
          <Ionicons name="heart" size={24} color="red" />
        ) : (
          <Ionicons name="heart-outline" size={24} color="black" />
        )}
        <Text style={{ marginLeft: 6, fontSize: 16 }}>
          {post.likes_by_users.length}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <Feather name="share" size={24} color="black" />
      </TouchableOpacity>
    </View>


    {comments == true && (
      <View style={{ marginTop: 10, width: "100%" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 24, height: 24, borderRadius: 50, marginLeft: 4 }}
            source={{ uri: post.profilePicture }}
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginLeft: 4 }}>Aniket Mishra </Text>
                <Text >  |  </Text>
                <Text style={{ marginRight: 4, fontSize: 12 }}>10 min ago</Text>
              </View>
             
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 4,
              }}
            >
              <Text style={{ fontSize: 12 }}>Replying to </Text>
              <Text style={{ fontSize: 12, color: "blue" }}>@aniketmishra</Text>
            </View>
            <Text style={{ marginLeft: 4 }}>Do you consider yourself </Text>
          </View>
        </View>
      </View>
    )}


    
  </View>
);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#00000aaa",
   
  },
  modalView: {
    
    backgroundColor: "white",
    borderRadius: 2,
    padding: 10,
    borderRadius: 14,
    marginLeft: 10, 
    marginRight: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
 
  modalText: {
   
  }
});

export default Post;
