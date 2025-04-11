// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD7_bah773Yb4tlUObslRon9JNl9ZEkLHw",
    authDomain: "stunting-app-db862.firebaseapp.com",
    databaseURL: "https://stunting-app-db862-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "stunting-app-db862",
    storageBucket: "stunting-app-db862.firebasestorage.app",
    messagingSenderId: "646831158152",
    appId: "1:646831158152:web:6f20b3f0b7a02d8af2803d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
