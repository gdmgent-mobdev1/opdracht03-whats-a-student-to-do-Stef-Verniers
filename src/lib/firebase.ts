/* eslint-disable no-sequences */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider,
  signInWithPopup, signInWithEmailAndPassword, updateProfile, User,
} from '@firebase/auth';
import {
  doc, getDoc, getDocs, getFirestore, collection, query, collectionGroup, where, getCountFromServer,
  writeBatch, Timestamp, setDoc, addDoc,
} from 'firebase/firestore';
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
const db = getFirestore();

// Takes care of error handling
const newError = sessionStorage.getItem('error');

// Allows user to log in
const registerUser = (e: any) => {
  e.preventDefault();
  if (newError) {
    sessionStorage.removeItem('error');
  }
  const username = (<HTMLInputElement>document.querySelector('input[name="username"]'))!.value;
  const password = (<HTMLInputElement>document.querySelector('input[name="password"]'))!.value;
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
    // Signed in
      const { user } = userCredential;
      console.log(user);
      sessionStorage.setItem('user', String(user.uid));
      window.location.replace('/');
    })
    .catch((error) => {
      const errorMessage = error.message;
      sessionStorage.setItem('error', String(errorMessage));
      window.location.reload();
    });
};

const loginUser = (e: any) => {
  const username = (<HTMLInputElement>document.querySelector('input[name="username"]'))?.value;
  const password = (<HTMLInputElement>document.querySelector('input[name="password"]'))?.value;
  e.preventDefault();
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
    // Signed in
      const { user } = userCredential;
      sessionStorage.setItem('user', String(user.uid));
      window.location.reload();
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
      const userPlaceholder = document.querySelector<HTMLHeadElement>('#dashboardName');
      const displaynamePlaceholder = document.querySelector<HTMLInputElement>('#displaynameInput');
      console.log(userPlaceholder);
      if (user.displayName !== null) {
        if (userPlaceholder) userPlaceholder.innerHTML = `Welcome ${user.displayName}`;
        if (userPlaceholder) userPlaceholder.setAttribute('value', `${user.displayName}`);
      } else {
        userPlaceholder!.innerHTML = `Welcome ${uid}`;
        displaynamePlaceholder!.setAttribute('value', `${uid}`);
        userPlaceholder!.style.fontSize = '1.6rem';
      }
    }
  });
  console.log('not logged in');
};

// Log in with Google
const google = (e:any) => {
  e.preventDefault();
  signInWithPopup(auth, googleProvider)
    .then((result: any) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const { user } = result;
      sessionStorage.setItem('user', String(user));
      window.location.replace('/');
    // ...
    }).catch((error: any) => {
    // Handle Errors here.
      // alert(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error.customData;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};

const updateDashboard = (e:any) => {
  const displaynamePlaceholder = document.querySelector<HTMLInputElement>('#displaynameInput')?.value;
  e.preventDefault();
  updateProfile(auth.currentUser!, {
    displayName: String(displaynamePlaceholder),
    photoURL: null,
  }).then(() => {
    window.location.reload();
  }).catch((error) => {
    console.log(error);
  });
};



// Allows user to log out
const logoutUser = (e: any) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      sessionStorage.removeItem('user');
      console.log('signed out successful');
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * FIRESTORE
 */

const getAmountOfProjects = async () => {
  const myUID = sessionStorage.getItem('user');
  const projects = query(collectionGroup(db, 'users'), where('UID', '==', `${myUID}`));
  const querySnapshot = await getDocs(projects);
  const snapshotProjects = await getCountFromServer(projects);
  const amountProjects = snapshotProjects.data().count;
  const snapshotUsers = await getCountFromServer(projects);
  const amountUsers = snapshotUsers.data().count;
  console.log(amountUsers);
  console.log(amountProjects);
  // Returns the amount of current projects in a message
  const amountProjectsMessage = document.querySelector<HTMLHeadingElement>('#amountProjects');
  if (amountProjectsMessage) {
    if (amountProjects === 0) {
      amountProjectsMessage.innerHTML = `U heeft nog geen projecten lopen. Maak er snel 1 aan of accepteer een project-uitnodiging`;
    } 
    else if (amountProjects === 1) {
      amountProjectsMessage.innerHTML = `You're taking part in ${amountProjects} project`;
    } 
    else if (amountProjects > 1) {
      amountProjectsMessage.innerHTML = `You're taking part in ${amountProjects} projects`;
    }
  }
};

const returnProjects = async () => {
  const list = document.querySelector<HTMLDivElement>('#projectList');
  const projects = query(collectionGroup(db, 'projects'));
  const querySnapshot = await getDocs(projects);
  querySnapshot.forEach((doc) => {
    const deadline = doc.data().Deadline;
    const fireBaseTime = new Date(
      deadline.seconds * 1000 + deadline.nanoseconds / 1000000,
    );
    const formatOptions = {
      format: 'dd MMM  yy', 
    };
    console.log(doc.id, '>', doc.data());
    const newElement = document.createElement('div');
    if (list) list.appendChild(newElement).setAttribute('class', 'projectCard');
    newElement.innerHTML = `
    <h4>${doc.id, doc.data().Name}</h4>
    <p>${fireBaseTime.toLocaleDateString('eng-BE', formatOptions)}</p>
    <span>3</span>
    `; 
  });
};

const createProject = async (e: any) => {
  const newName = document.querySelector<HTMLInputElement>('#newName')?.value;
  const newDate = document.querySelector<HTMLInputElement>('#newDate')?.value;
  const newDescription = document.querySelector<HTMLInputElement>('#newDescription')?.value;
  const username = auth.currentUser?.displayName;
  e.preventDefault();
  const project = await setDoc(doc(db, 'projects', newName), {
    Name: newName,
    Deadline: Timestamp.fromDate(new Date(newDate)),
    Description: newDescription,
  });
  const user = await addDoc(collection(db, 'projects', newName, 'users'), {
    Name: auth.currentUser!.displayName,
    UID: auth.currentUser!.uid,
    Email: auth.currentUser!.email,
  });
  window.location.reload();
};

export {
  app, auth, userCred, onAuthStateChanged, registerUser, loginUser, logoutUser, google, updateDashboard,
  getAmountOfProjects, returnProjects, createProject,
};
