/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable import/no-cycle */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
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
  writeBatch, Timestamp, setDoc, addDoc, onSnapshot, DocumentData, updateDoc,
} from 'firebase/firestore';
import Card from '../Components/Project/Card';
import { convertFirebaseDate } from './functions';
import Info from '../Components/Project/Info';
import Task from '../Components/Pages/Project';
import Header from '../Components/Header';
import ListItem from '../Components/Subtask/listItem';
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
const appContainer = document.querySelector<HTMLDivElement>('#app')!;
const body = document.querySelector<HTMLBodyElement>('body')!;

console.log(myUID);


// Takes care of error handling
const newError = sessionStorage.getItem('error');

// Allows user to log in
const registerUser = (e: any) => {
  e.preventDefault();
  if (newError) {
    sessionStorage.removeItem('error');
  }
  const username = document.querySelector<HTMLInputElement>('input[name="username"]')!.value;
  const useremail = document.querySelector<HTMLInputElement>('input[name="usermail"]')!.value;
  const password = document.querySelector<HTMLInputElement>('input[name="password"]')!.value;
  createUserWithEmailAndPassword(auth, useremail, password)
    .then(async (userCredential) => {
    // Signed in
      const { user } = userCredential;
      sessionStorage.setItem('user', String(user.uid));
      await setDoc(doc(db, "users", user.uid), {
        name: `${username}`,
        email: `${useremail}`,
        uid: `${user.uid}`,
      });
      if (user) {
        window.location.href = '/home';
      }  
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
      window.location.replace('/home');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const userCred = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const { uid } = user;
      const docRef = doc(db, 'users', `${uid}`);
      const docSnap = await getDoc(docRef);
      const userDoc = docSnap.data();
      const { name }: any = userDoc;
      const userPlaceholder = document.querySelector<HTMLHeadElement>('#dashBoardName');
      const header = new Header(name);
      body.insertBefore(header.render(), appContainer);
      const displaynamePlaceholder = document.querySelector<HTMLInputElement>('#displaynameInput');
      if (user.displayName !== null) {
        if (userPlaceholder) header.render();
        if (userPlaceholder) userPlaceholder.setAttribute('value', `${user.displayName}`);
      } else {
        console.log(name);
        userPlaceholder!.innerText = `Welcome ${uid}`;
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
      window.location.replace('/home');
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
  const list = await document.querySelector<HTMLDivElement>('#projectList');
  const getMyProjects = query(collection(db, 'projects'), where(`${myUID}.uid`, '==', `${myUID}`));
  const projects = await getDocs(getMyProjects);
  const projectsUsersPromise = projects.docs.map(async (doc: any) => {
    const users = await getCountFromServer(collection(db, `projects`));
    const id = doc.id;
    console.log(id);
    
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

  // Takes you to the project page
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;
  const homeContainer = document.querySelector<HTMLDivElement>('#homeContainer')!;
  const cards = document.querySelectorAll<HTMLHeadingElement>('.projectCard');
  const check = sessionStorage.getItem('user');


  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', async () => {
      const cardId = `${card.getAttribute('id')}`;
      const getMyDoc = doc(db, 'projects', cardId);
      const myDoc = await getDoc(getMyDoc);
      const id = myDoc.id;
      const { name, deadline }: any = myDoc.data();
      const thisDate = convertFirebaseDate(deadline);
      sessionStorage.setItem('projectId', id);
      sessionStorage.setItem('projectName', name);
      sessionStorage.setItem('projectDeadline', thisDate);
      const task = new Task(id, name, thisDate);
      window.location.href = `/project/${id}`;
    });
  }

  // Shows information about a project 
  const icons = document.querySelectorAll<HTMLImageElement>('img');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < icons.length; i++) {
    const element = icons[i];
    element.addEventListener('click', async (e) => {
      if (e && e.stopPropagation) e.stopPropagation(); 
      const cardId = `${element.getAttribute('id')}`;
      const getMyDoc = doc(db, 'projects', cardId.slice(5));
      const myDoc = await getDoc(getMyDoc);
      console.log(myDoc.data());
      const id = myDoc.id;
      const { name, description, users }:any = myDoc.data();
      const thisDate = convertFirebaseDate(myDoc.data()?.deadline);
      const info = new Info(name, thisDate, description, users, id);
      return info.render();
    });
  }
};

const createProject = async (e: any) => {
  const newName = document.querySelector<HTMLInputElement>('#newName')!.value;
  const newDate = document.querySelector<HTMLInputElement>('#newDate')!.value;
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

const returnSubtasks = async () => {
  const list = document.querySelector('#taskList');
  const listItem = document.querySelector('#listItem');
  const projectId = sessionStorage.getItem('projectId');
  const subtasks = collection(db, `subtasks`);
  const getSubTask = await getDocs(subtasks);
  if (!getSubTask) {
    list!.innerHTML = `
    <h4>No current Subtasks</h4>
    `;
  }
  getSubTask.forEach((doc) => {
    console.log(doc.data());
    const {
      title, finished, description, user, timeSpent, 
    } = doc.data();
    const item = new ListItem(doc.id, title, finished, description, user, timeSpent);
    item.render();
  });

  const icons = document.querySelectorAll('.arrow');
  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];
    icon.addEventListener('click', (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      const taskId = `${icon.getAttribute('id')}`;
      const thisArrow = document.querySelector(`#extend-${taskId}`);
      console.log(icon);
      thisArrow?.classList.toggle('openMargin');
    });
  }
  console.log(icons);
  


  const tasks = document.querySelectorAll('.subtaskItem');
  console.log(tasks);
  

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(task);
    task.addEventListener('click', async () => {
      const taskId = `${task.getAttribute('id')}`;
      console.log(taskId);
      const getMyDoc = doc(db, 'subtasks', taskId);
      const myDoc = await getDoc(getMyDoc);
      const id = myDoc.id;
      console.log(myDoc.data());      
      const {
        title, description, finished, pending, timeSpent, timer, 
      }: any = myDoc.data();
      sessionStorage.setItem('taskId', id);
      sessionStorage.setItem('taskName', title);
      sessionStorage.setItem('taskDescription', description);
      sessionStorage.setItem('taskFinish', finished);
      sessionStorage.setItem('taskPend', pending);
      sessionStorage.setItem('taskSpend', timeSpent);
      sessionStorage.setItem('taskTimer', timer);
      window.location.href = `/subtask/${id}`;
    });
  }
};

const createSubtask = async (e: any) => {
  const projectId = sessionStorage.getItem('projectId');
  console.log(projectId);

  const taskName = document.querySelector<HTMLInputElement>('#newSubtaskName')?.value;
  const taskDescription = document.querySelector<HTMLInputElement>('#newSubtaskDescription')?.value;
  const taskUser = document.querySelector<HTMLSelectElement>('#newSubtaskUser')?.value;

  console.log(taskName);
  e.preventDefault();
  const newTask = await addDoc(collection(db, `projects/${projectId}/subtasks`), {
    title: taskName,
    description: taskDescription,
    user: taskUser,
    finished: false,
    pending: false,
    timeSpent: '00:00',
    timer: '00:00',
  });
  window.location.reload();
};

const stopWatch = (): { start: () => void, end: () => void } => {
  let startTime: any;
  let endTime: any;
  return {
    start: () => {
      startTime = Date.now();
      function update() {
        const counter = document.getElementById('timerText')!;
        const elapsedTime = Date.now() - startTime;
        const elapsedMinutes = Math.floor(elapsedTime / 60000);
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const thisTime = String(elapsedHours);
        thisTime.toString();
        console.log(thisTime);
        if (elapsedHours < 10 && elapsedMinutes < 10) {
          counter.innerText = `0${elapsedHours.toString()}:0${elapsedMinutes % 60}`; 
        } else {
          counter.innerText = `0${elapsedHours.toString()}:0${elapsedMinutes % 60}`; 
        }
        console.log(elapsedHours);
      }
      setInterval(update, 1000);
    },
    end: () => {
      endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const elapsedMinutes = Math.floor(elapsedTime / 60000);
      const elapsedHours = Math.floor(elapsedMinutes / 60);
      const thisTime = `${elapsedHours}:${elapsedMinutes % 60}`;
      thisTime.toString();
      console.log(thisTime);
      const docId = sessionStorage.getItem('taskId');
      console.log(docId);
      
      const washingtonRef = doc(db, "subtasks", `${docId}`);
      updateDoc(washingtonRef, {
        timeSpent: `0${elapsedHours.toString()}:0${elapsedMinutes % 60}`,
      });
    },
  };
};

window.setTimeout(() => {
  const timer = stopWatch();
  const counter = document.querySelector('#subTaskCounter')!;
  const start = document.querySelector('#startCounting');
  const stop = document.querySelector('#stopCounting');
  console.log(stop);
  
  start!.addEventListener('click', () => {
    timer.start();
  });
  stop!.addEventListener('click', () => {
    timer.end();
  });
}, 100);


export {
  app, auth, userCred, onAuthStateChanged, registerUser, loginUser, logoutUser, google, updateDashboard,
  getAmountOfProjects, returnProjects, createProject, returnSubtasks, createSubtask, stopWatch,
};
