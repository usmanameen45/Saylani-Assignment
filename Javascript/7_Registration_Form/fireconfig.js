// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
import { deleteDoc, doc, setDoc, getFirestore,addDoc,collection, getDocs  } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATGlq5XU9Vo3Lijg4JOgZhhLzSa3tXvnU",
  authDomain: "smit-practice-6e41f.firebaseapp.com",
  projectId: "smit-practice-6e41f",
  storageBucket: "smit-practice-6e41f.firebasestorage.app",
  messagingSenderId: "403150011944",
  appId: "1:403150011944:web:3b95c1679bc44080de3f1d",
  measurementId: "G-JV69PZ6T7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {getAuth, createUserWithEmailAndPassword, doc, setDoc, db, addDoc,collection, getDocs ,deleteDoc}
