// import { initializeApp } from 'firebase/app';
// import 'firebase/compat/firestore';
// import 'firebase/auth'
// import { getAuth, onAuthStateChanged, } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyARPrb_k9hwbVmOPQhuRshEYVwVzAU9MNQ",
//   authDomain: "my-chess-806f4.firebaseapp.com",
//   projectId: "my-chess-806f4",
//   storageBucket: "my-chess-806f4.appspot.com",
//   messagingSenderId: "106950577505",
//   appId: "1:106950577505:web:28e3d0d4f5cff3cac1c920"
//   };

// // firebase.initializeApp(firebaseConfig);
// // export const db = firebase.fireStore()
// // export const auth = firebase.auth()
// // export default firebase

// const firebase = initializeApp(firebaseConfig);
// export const db = firebase.firestore()
// export const auth = getAuth(firebase)

// // export const userAuth = onAuthStateChanged(auth, (user) => {
// //   if (user) {
// //     // User is signed in, see docs for a list of available properties
// //     // https://firebase.google.com/docs/reference/js/firebase.User
// //     setUser(user);
// //     // ...
// //   } else {
// //     // User is signed out
// //     // ...
// //     setUser(null)
// //     }
// //   }
// // );


// export default firebase;

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
     apiKey: "AIzaSyARPrb_k9hwbVmOPQhuRshEYVwVzAU9MNQ",
     authDomain: "my-chess-806f4.firebaseapp.com",
     projectId: "my-chess-806f4",
     storageBucket: "my-chess-806f4.appspot.com",
     messagingSenderId: "106950577505",
     appId: "1:106950577505:web:28e3d0d4f5cff3cac1c920"
     };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase