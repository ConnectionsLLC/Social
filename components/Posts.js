import { View, Text } from 'react-native'
import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <View style={{marginBottom: 33}}>
    <Post/>
      <Post />
      <Post />
      <Post />
    </View>
  )
}

export default Posts