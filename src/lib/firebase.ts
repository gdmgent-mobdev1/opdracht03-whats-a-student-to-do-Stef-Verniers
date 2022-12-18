// Import the functions you need from the SDKs you need
import {
  getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider,
  signInWithPopup, signInWithEmailAndPassword,
} from '@firebase/auth';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD9ROSgzdZifHKScwP5eFuP9nA0pkYO0Fc',
  authDomain: 'opus-9174b.firebaseapp.com',
  projectId: 'opus-9174b',
  storageBucket: 'opus-9174b.appspot.com',
  messagingSenderId: '105983193134',
  appId: '1:105983193134:web:c6b98973ba14d93e0b6fbf',
  measurementId: 'G-2TS0MRSG40',
};

// Initialize Firebase && define constants
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// Allows user to log in
const registerUser = (e: any) => {
  e.preventDefault();
  const username = (<HTMLInputElement>document.querySelector('input[name="username"]'))!.value;
  const password = (<HTMLInputElement>document.querySelector('input[name="password"]'))!.value;
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
    // Signed in
      const { user } = userCredential;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.reload();
};

const loginUser = (e: any) => {
  const username = (<HTMLInputElement>document.querySelector('input[name="username"]'))?.value;
  const password = (<HTMLInputElement>document.querySelector('input[name="password"]'))?.value;
  e.preventDefault();
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
    // Signed in
      const { user } = userCredential;
      sessionStorage.setItem('user', String(userCredential));
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const userCred = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const { uid } = user;
      console.log(uid);
      console.log(user);
    } else {
      console.log('not logged in');
    }
  });
};



// Log in with Google
const google = () => {
  signInWithPopup(auth, googleProvider)
    .then((result: any) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const { user } = result;
    // ...
    }).catch((error: any) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error.customData;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};



// Allows user to log out
const logoutUser = (e: any) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      sessionStorage.removeItem('user');
      console.log('signed out successful');
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  app, userCred, onAuthStateChanged, registerUser, loginUser, logoutUser, google,
};
