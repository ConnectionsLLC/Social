import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA5T4at59iEw1wSzn5iHUrfe_On1c3YAwM",
    authDomain: "social-368115.firebaseapp.com",
    projectId: "social-368115",
    storageBucket: "social-368115.appspot.com",
    messagingSenderId: "496703583308",
    appId: "1:496703583308:web:6a6418a6f32820044370e9"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase