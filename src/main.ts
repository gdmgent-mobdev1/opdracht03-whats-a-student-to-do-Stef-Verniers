import './css/reset.css';
import './css/style.css';
import './css/login.css';
import { LoginComponent } from './Components';
import { app, submitLogin } from './lib/firebase';

const login = new LoginComponent();

const appContainer = document.querySelector<HTMLDivElement>('#app')!;

appContainer.appendChild(login.render());

const $submitButton = document.querySelector('#login-button');

$submitButton?.addEventListener('click', submitLogin);
