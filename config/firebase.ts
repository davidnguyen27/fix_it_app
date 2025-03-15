import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6W_P-WxKIMSomm0W3UuL7W0r2uodRRTo",
  authDomain: "swd392-3203c.firebaseapp.com",
  projectId: "swd392-3203c",
  storageBucket: "swd392-3203c.appspot.com",
  messagingSenderId: "46151118776",
  appId: "1:46151118776:web:297efcbdde2bfc4b8f694d",
  measurementId: "G-K0V44TK4DP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { firebase, storage };
