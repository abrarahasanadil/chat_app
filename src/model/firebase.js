import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnlrJ4bbMrphKAwuBDBMTGQqKfSkcA5qA",
  authDomain: "chat-app-82234.firebaseapp.com",
  projectId: "chat-app-82234",
  storageBucket: "chat-app-82234.appspot.com",
  messagingSenderId: "731977059198",
  appId: "1:731977059198:web:b25052297a1e7b2e32412f",
  measurementId: "G-LHRSTEFP8E",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
