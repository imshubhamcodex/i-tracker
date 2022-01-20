import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0oVU8Dc880rzEvpWwNuREJ1NbIkZ3EAU",
  authDomain: "fintrek-9a207.firebaseapp.com",
  projectId: "fintrek-9a207",
  storageBucket: "fintrek-9a207.appspot.com",
  messagingSenderId: "652714139167",
  appId: "1:652714139167:web:50406ebafa4d3d9a207f2a",
  measurementId: "G-LSSN6RLKL1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
