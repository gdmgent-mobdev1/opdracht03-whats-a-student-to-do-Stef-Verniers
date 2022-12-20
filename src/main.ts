import './css/reset.css';
import './css/style.css';
import './css/header.css';
import './css/login.css';
import './css/register.css';

import { LoginComponent, RegisterComponent, HomeComponent } from './Components';
import {
  app, registerUser, loginUser, logoutUser, google, userCred,
} from './lib/firebase';

const login = new LoginComponent();
const register = new RegisterComponent();
const home = new HomeComponent();
const appContainer = document.querySelector<HTMLDivElement>('#app')!;

const check = sessionStorage.getItem('user');
const registerPath = window.location.pathname;

if (check) {
  appContainer.appendChild(home.render());
} else if (window.location.pathname === '/register') {
  appContainer.appendChild(register.render());
} else {
  appContainer.appendChild(login.render());
}

userCred();

window.addEventListener('DOMContentLoaded', () => {
  const errorMessage = document.querySelector<HTMLParagraphElement>('.error')!;
  const newError = sessionStorage.getItem('error');

  if (newError) {
    if (newError === 'Firebase: Error (auth/email-already-in-use).') {
      errorMessage.innerHTML = 'There is already a user registered witht this email!';
      errorMessage.classList.remove('hidden');
    }
  }

  const $loginButton = document.querySelector('#login-button');
  const $googleButton = document.querySelector('#login-google');
  const $registerButton = document.querySelector('#register-button');
  const $logoutButton = document.querySelector('#nav-logout');

  $loginButton?.addEventListener('click', loginUser);
  $googleButton?.addEventListener('click', google);
  $registerButton?.addEventListener('click', registerUser);
  $logoutButton?.addEventListener('click', logoutUser);
});
