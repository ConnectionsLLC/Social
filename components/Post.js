import { View, Text, Image } from 'react-native'
import React from 'react'

const Post = () => {
  return (
    <View>
          <View style={{ borderBottomWidth: 1, borderColor: '#E2DCDC' }}>
              {/* <Divider width={1} orientaion="vertical"/> */}
              <PostHeader/>
              <PostBody  />

          </View>
    </View>
  )
}
const PostHeader = ({ post }) => (
    <View style={{ justifyContent: 'space-between', flexDirection: "row", margin: 5, }}>
        <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5, }}>
            <View>
                <Image style={{ width: 30, height: 30, borderRadius: 50, marginLeft: 4, }} source={{ uri: 'https://lh3.googleusercontent.com/a/AItbvmld8x4l-U0o2L28Ipg6VMny5NvPVM0sOjiqjlT8=s96-c' }} />
            </View>
            <View>
                <Text style={{ marginLeft: 4, fontWeight: "600", fontSize: 14 }}>Aniket Mishra</Text>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ marginLeft: 4, fontSize: 10 }}>@aniketmishra</Text>
                    <Text style={{ marginLeft: 4, fontSize: 10 }}>|</Text>
                    <Text style={{ marginLeft: 4, fontSize: 10 }}>5 minutes ago</Text>
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
        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse </Text>
        </View>
        <View>
      <Image style={{ alignSelf: "stretch" , height: 400, marginLeft: 30, marginRight: 30, borderRadius: 10, marginBottom: 10}} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pentagon-89b4a.appspot.com/o/posts%2FnA3WuHJMqctY7O7QSr8l%2Fimage?alt=media&token=848b3005-976b-444e-9e6e-c298b19faae1' }} />
    </View>
    </View>
)

export default Post