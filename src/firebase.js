import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/auth"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyDpHXwr3eCrU3DWMAAl0c7l2J8MZ91UYd4",
  authDomain: "chat-app-926f3.firebaseapp.com",
  databaseURL: "https://chat-app-926f3-default-rtdb.firebaseio.com",
  projectId: "chat-app-926f3",
  storageBucket: "gs://chat-app-926f3.appspot.com/",
  messagingSenderId: "1028978878717",
  appId: "1:1028978878717:web:b0f475ea017b6cfe273694",
  measurementId: "G-7DPXZ3WSMB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();