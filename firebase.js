import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaOMkwL8WRVQBpKL1SxaCCfVvvEWgTjfc",
  authDomain: "chess-book-exchange.firebaseapp.com",
  projectId: "chess-book-exchange",
  storageBucket: "chess-book-exchange.firebasestorage.app",
  messagingSenderId: "767601168380",
  appId: "1:767601168380:web:0145991eee4aa70ef12c79",
  measurementId: "G-J4SPRB4VSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ THIS LINE IS THE KEY
export const db = getFirestore(app);
