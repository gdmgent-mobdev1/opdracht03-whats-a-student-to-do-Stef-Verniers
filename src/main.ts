import './css/reset.css';
import './css/style.css';
import './css/login.css';
import { LoginComponent, RegisterComponent, HomeComponent } from './Components';
import { app, submitLogin, loginCheck } from './lib/firebase';

const login = new LoginComponent();
const register = new RegisterComponent();
const home = new HomeComponent();

const appContainer = document.querySelector<HTMLDivElement>('#app')!;

const $submitButton = document.querySelector('#login-button');

$submitButton?.addEventListener('click', submitLogin);

// If logged
if (loginCheck() === true) {
  appContainer.appendChild(home.render());
} else {
  appContainer.appendChild(login.render());
}
