// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyA2JJJGL_pNg-3FiJ8dyTh3yz3tsb3Jz2o',
   authDomain: 'house-marketplace-app-514de.firebaseapp.com',
   projectId: 'house-marketplace-app-514de',
   storageBucket: 'house-marketplace-app-514de.appspot.com',
   messagingSenderId: '1085596087866',
   appId: '1:1085596087866:web:efa576022874a1ab396703',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
