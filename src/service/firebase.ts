import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDwnyVdp7sO-JjKy0IwPZQLFE9tpN18_-U",
  authDomain: "kmcollaborator.firebaseapp.com",
  projectId: "kmcollaborator",
  storageBucket: "kmcollaborator.appspot.com",
  messagingSenderId: "519188554761",
  appId: "1:519188554761:web:3bb6922e6ac4cff63684d8",
  measurementId: "G-EDSEW48LH0"
};



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var storage = firebase.storage(app);
export default storage

