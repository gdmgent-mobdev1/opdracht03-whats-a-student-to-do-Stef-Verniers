/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import './css/reset.css';
import './css/style.css';
import './css/header.css';
import './css/login.css';
import './css/register.css';
import './css/home.css';

import { LoginComponent, RegisterComponent, HomeComponent } from './Components';
import {
  app, registerUser, loginUser, logoutUser, google, userCred, auth, updateDashboard, getAmountOfProjects, returnProjects, createProject, showProjectInformation,
} from './lib/firebase';
import {
  createNewProject, hideEditBlock, showEditBlock, todaysDate,
} from './lib/functions';

// Consts about the app buildup
const login = new LoginComponent();
const register = new RegisterComponent();
const home = new HomeComponent();
const appContainer = document.querySelector<HTMLDivElement>('#app')!;
const check = sessionStorage.getItem('user');
const registerPath = window.location.pathname;

// Checks if a user is logged in and renders the corresponding page according to the outcome of the IF-statement
if (check) {
  appContainer.appendChild(home.render());
} else if (window.location.pathname === '/register') {
  appContainer.appendChild(register.render());
} else {
  appContainer.appendChild(login.render());
}

/**
 * The homepage
 */

// Running functions
userCred();
getAmountOfProjects();
returnProjects();
createNewProject();

// Saves a new username
const dashboardUpdateButton = document.querySelector<HTMLButtonElement>('#confirmEdits');
dashboardUpdateButton?.addEventListener('click', updateDashboard);
// Renders out the current date in a specific layout
const renderDate = document.querySelector<HTMLSpanElement>('#currentDate');
if (renderDate) renderDate.innerHTML = `Today is ${todaysDate()}`;
// Shows the edit block for the username
const editButton = document.querySelector<HTMLHeadElement>('#dashboardName');
const editBlock = document.querySelector<HTMLDivElement>('#dashboardEdits-form');
const editBlockCancel = document.querySelector<HTMLButtonElement>('#cancelEdits');
console.log(editBlock);
editButton?.addEventListener('click', showEditBlock);
editBlockCancel?.addEventListener('click', hideEditBlock);
// Stores new project data to firestore
const submitNewProject = document.querySelector<HTMLButtonElement>('#confirmNewProject');
submitNewProject?.addEventListener('click', createProject);

// Shows project information
const showInfo = document.querySelector<HTMLImageElement>('#projectInfo');
console.log(showInfo);
showInfo?.addEventListener('click', showProjectInformation);

// Renders const and stuff when the DOM content is loaded so there will be no errors
window.addEventListener('DOMContentLoaded', () => {
  const errorMessage = document.querySelector<HTMLParagraphElement>('.error')!;
  const newError = sessionStorage.getItem('error');

  // Rule list: Rewrites errors for form validation
  if (newError) {
    if (newError === 'Firebase: Error (auth/email-already-in-use).') {
      errorMessage.innerHTML = 'There is already a user registered witht this email!';
      errorMessage.classList.remove('hidden');
    }
  }

  // Defining buttons for adding functionality
  const $loginButton = document.querySelector('#login-button');
  const $googleButton = document.querySelector('#login-google');
  const $registerButton = document.querySelector('#register-button');
  const $logoutButton = document.querySelector('#nav-logout');

  // Binding functions to Eventlisteners
  $loginButton?.addEventListener('click', loginUser);
  $googleButton?.addEventListener('click', google);
  $registerButton?.addEventListener('click', registerUser);
  $logoutButton?.addEventListener('click', logoutUser);
  window.addEventListener('unload', logoutUser);
});
