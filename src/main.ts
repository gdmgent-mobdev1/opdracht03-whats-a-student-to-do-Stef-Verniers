import './css/reset.css';
import './css/style.css';
import './css/header.css';
import './css/login.css';
import { LoginComponent, RegisterComponent, HomeComponent } from './Components';
import {
  app, registerUser, loginUser, logoutUser, google, userCred,
} from './lib/firebase';

const login = new LoginComponent();
const register = new RegisterComponent();
const home = new HomeComponent();
const appContainer = document.querySelector<HTMLDivElement>('#app')!;

const check = window.sessionStorage.getItem('user');
console.log(check);

if (check) {
  appContainer.appendChild(home.render());
} else {
  appContainer.appendChild(login.render());
}



window.addEventListener('DOMContentLoaded', () => {
  const $loginButton = document.querySelector('#login-button');
  const $googleButton = document.querySelector('#login-google');
  const $logoutButton = document.querySelector('#nav-logout');

  userCred();

  $loginButton?.addEventListener('click', loginUser);
  $googleButton?.addEventListener('click', google);
  $logoutButton?.addEventListener('click', logoutUser);
});
