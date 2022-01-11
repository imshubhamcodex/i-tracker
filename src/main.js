import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/includes/vuetify";
Vue.config.productionTip = false;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0oVU8Dc880rzEvpWwNuREJ1NbIkZ3EAU",
  authDomain: "fintrek-9a207.firebaseapp.com",
  projectId: "fintrek-9a207",
  storageBucket: "fintrek-9a207.appspot.com",
  messagingSenderId: "652714139167",
  appId: "1:652714139167:web:50406ebafa4d3d9a207f2a",
  measurementId: "G-LSSN6RLKL1",
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
