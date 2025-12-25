import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
apiKey: "AIzaSyDCT8R43UFXV3AifZA_tvg1d6U9VmrOFr8",
authDomain: "frozen-food-19e7d.firebaseapp.com",
projectId: "frozen-food-19e7d",
storageBucket: "frozen-food-19e7d.firebasestorage.app",
messagingSenderId: "115046333884",
appId: "1:115046333884:web:1152fcf5a40ac9a0f5ffb9"
}


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)