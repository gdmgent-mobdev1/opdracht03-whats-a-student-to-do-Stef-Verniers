/* eslint-disable prefer-destructuring */
/* eslint-disable no-sequences */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider,
  signInWithPopup, signInWithEmailAndPassword, updateProfile, User,
} from '@firebase/auth';
import {
  doc, getDoc, getDocs, getFirestore, collection, query, collectionGroup, where, getCountFromServer,
  writeBatch, Timestamp, setDoc, addDoc, onSnapshot,
} from 'firebase/firestore';
import Card from '../Components/Card';
import { convertFirebaseDate } from './functions';
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
const myUID = sessionStorage.getItem('user');
console.log(myUID);


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
      console.log(user.uid);
      
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
      const userPlaceholder = document.querySelector<HTMLHeadElement>('#dashboardName');
      const displaynamePlaceholder = document.querySelector<HTMLInputElement>('#displaynameInput');
      if (user.displayName !== null) {
        if (userPlaceholder) userPlaceholder.innerHTML = `Welcome ${user.displayName}`;
        if (userPlaceholder) userPlaceholder.setAttribute('value', `${user.displayName}`);
      } else {
        userPlaceholder!.innerHTML = `Welcome ${uid}`;
        displaynamePlaceholder!.setAttribute('value', `${uid}`);
        userPlaceholder!.style.fontSize = '1.6rem';
      }
    }
    return user;
  });
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
      sessionStorage.setItem('user', String(user.uid));
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
  const users = query(collection(db, 'projects'), where(`${myUID}.uid`, '==', `${myUID}`));
  const snapshotProjects = await getCountFromServer(users);
  const amountProjects = snapshotProjects.data().count;
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
  console.log(list);
  
  const getMyProjects = query(collection(db, 'projects'), where(`${myUID}.uid`, '==', `${myUID}`));
  const projects = await getDocs(getMyProjects);

  console.log(projects);

  projects.forEach((doc) => {
    console.log(doc.data());
  });
  

  const projectsUsersPromise = projects.docs.map(async (doc: any) => {
    console.log(doc);
    
    const users = await getCountFromServer(collection(db, `projects`));
    const id = doc.id;
    const { name, description } = doc.data();
    const thisDate = convertFirebaseDate(doc.data().deadline);
    return {
      id, name, users: users.data().count, description, thisDate,
    };
  }); 
  const projectsUsers = await Promise.all(projectsUsersPromise);

  
  projectsUsers.forEach(async (project: any) => {
    const card = new Card(project.name, project.thisDate, project.users, project.id);
    if (list) list.appendChild(card.render());
  });
};

const createProject = async (e: any) => {
  const newName = document.querySelector<HTMLInputElement>('#newName')?.value;
  const newDate = document.querySelector<HTMLInputElement>('#newDate')?.value;
  
  const newDescription = document.querySelector<HTMLInputElement>('#newDescription')?.value;
  const username = auth.currentUser?.displayName;
  e.preventDefault();
  const usersRef = collection(db, 'projects');
  const userRef = doc(usersRef);
  const id = userRef.id;
  const project = await addDoc(collection(db, 'projects'), {
    name: newName,
    deadline: Timestamp.fromDate(new Date(newDate)),
    description: newDescription,
    id: userRef.id,
    [`${myUID}`]: {
      name: auth.currentUser!.displayName,
      uid: auth.currentUser!.uid,
      email: auth.currentUser!.email,
    },
  });
  window.location.reload();
};


export {
  app, auth, userCred, onAuthStateChanged, registerUser, loginUser, logoutUser, google, updateDashboard,
  getAmountOfProjects, returnProjects, createProject,
};
