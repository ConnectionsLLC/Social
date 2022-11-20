import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import *  as Google from 'expo-auth-session'
import firebase from '../firebase'
const AuthConText = createContext({})


export const AuthProvider = ({ children }) => {
const [CurrentUser, setCurrentUser] = useState(null)


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

