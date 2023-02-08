import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBWWCPObIWXDRHoYY-oqilLZyLDqCZZi-8",
  authDomain: "react-native-269ca.firebaseapp.com",
  projectId: "react-native-269ca",
  storageBucket: "react-native-269ca.appspot.com",
  messagingSenderId: "926393080008",
  appId: "1:926393080008:web:8650aa94653d88fe19edfd",
  measurementId: "G-8GB54DYPK7",
};

const firebase = initializeApp(firebaseConfig);

const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
