import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../firebase'
import { onSnapshot, query, doc, collection, where } from 'firebase/firestore'
const AuthConText = createContext({})


export const AuthProvider = ({ children }) => {
const [CurrentUser, setCurrentUser] = useState(null)
const [userInfo, setUserInfo] = useState([])

  const userHandler = user =>
    user ? setCurrentUser(user) : setCurrentUser(null)
  useEffect(
    () => firebase.auth().onAuthStateChanged(user => userHandler(user)),
    
    []
  )
  

  
  return (
    <AuthConText.Provider value={{
        user: CurrentUser,
      
    }}>
        {children}
    </AuthConText.Provider>
  )
}
export default function useAuth() {
    return useContext(AuthConText)
}

