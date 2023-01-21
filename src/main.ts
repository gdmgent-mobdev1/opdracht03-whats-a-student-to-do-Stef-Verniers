/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
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
  app, registerUser, loginUser, logoutUser, google, userCred, auth, updateDashboard, getAmountOfProjects, returnProjects, createProject,
} from './lib/firebase';
import {
  todaysDate,
} from './lib/functions';
import Info from './Components/Project/Info';
import Router from './lib/router';
import Header from './Components/Header';

// Consts about the app buildup
const login = new LoginComponent();
const register = new RegisterComponent();
const home = new HomeComponent();
const appContainer = document.querySelector<HTMLDivElement>('#app')!;
const check = sessionStorage.getItem('user');
const registerPath = window.location.pathname;

/**
 * The homepage
 */

window.addEventListener('DOMContentLoaded', () => {
  // Running functions
  userCred();
  Router();
  getAmountOfProjects();
  returnProjects();

  // Shows project information
  // const showInfo = document.querySelector<HTMLImageElement>('#projectInfo');
  // showInfo?.addEventListener('click', showProjectInformation);

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

  // Binding functions to Eventlisteners
  $loginButton?.addEventListener('click', loginUser);
  $googleButton?.addEventListener('click', google);
  $registerButton?.addEventListener('click', registerUser);
});
