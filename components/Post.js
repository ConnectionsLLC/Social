import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const Post = ({post}) => {
   const [data, setData] = useState([])


  return (
    <View>
          <View style={{ borderBottomWidth: 1, borderColor: '#E2DCDC' }}>
              {/* <Divider width={1} orientaion="vertical"/> */}
              <PostHeader post={post}/>
              <PostBody  post={post}/>
              <PostFooter post={post}/>

          </View>
    </View>
  )
}
const PostHeader = ({ post }) => (

    <View style={{ justifyContent: 'space-between', flexDirection: "row", margin: 5, }}>
        <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5, }}>
            <View>
                <Image style={{ width: 30, height: 30, borderRadius: 50, marginLeft: 4, }} source={{ uri: post.profilePicture }} />
            </View>
            <View>
                <Text style={{ marginLeft: 4, fontWeight: "600", fontSize: 14 }}>{post.username}</Text>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ marginLeft: 4, fontSize: 10 }}>{post.lowerUsername}</Text>
                  
                </View>

            </View>
        </View>
        <View>
            <Text style={{ marginRight: 10, fontSize: 20 }}>...</Text>
        </View>
    </View>
)
const PostBody = ({ post }) => (
    <View>
        <View style={{ marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>{post.posttext} </Text>
        </View>
        <View>
   {post.image &&(
                <Image style={{ alignSelf: "stretch", height: 400, marginLeft: 15, marginRight: 15, borderRadius: 10, }} source={{ uri: post?.image }} />
   )}
    </View>
    <View style={{marginTop: 15,marginRight: 15, marginLeft: 15, flexDirection: "row"}}>
        <Text style={{color: 'grey', fontStyle: 'bold'}}>10:00 PM</Text>
        <Text>   |   </Text>
        <Text style={{ color: 'grey'}}>24th December 2022</Text>
    </View>
    </View>
)
const PostFooter = ({ post }) => (
    <View style={{margin: 10}}>
       <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 18, marginRight: 18}}>
           <TouchableOpacity >
                <Ionicons name="chatbubble-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
                <Text>{post.likes.length}</Text>
                <Octicons name="reply" size={24} color="black" />
  </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
                <AntDesign name="hearto" size={24} color="black" />
 </TouchableOpacity>
<TouchableOpacity>
                <Feather name="share" size={24} color="black" />

</TouchableOpacity>
       </View>
    </View>
)

export default Post