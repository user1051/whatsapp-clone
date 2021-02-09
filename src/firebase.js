import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAxEQmjr5sw42XSy4qjZyrvcoINPPWtW3E",
  authDomain: "whatsapp-clone-2922d.firebaseapp.com",
  projectId: "whatsapp-clone-2922d",
  storageBucket: "whatsapp-clone-2922d.appspot.com",
  messagingSenderId: "1096801445172",
  appId: "1:1096801445172:web:1faf612b2bc8425f477161",
  measurementId: "G-KEYHMKR1G1"
};

const firebaseApp  = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); // google autentication

export { auth, provider };
export default db;