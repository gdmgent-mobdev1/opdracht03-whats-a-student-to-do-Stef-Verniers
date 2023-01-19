import Navigo from 'navigo';
import {
  HomeComponent, LoginComponent, RegisterComponent,
} from '../Components';
import Task from '../Components/Task';

const id = sessionStorage.getItem('id');
const name = sessionStorage.getItem('name');
const deadline = sessionStorage.getItem('deadline');

const Router = () => {
  const login = new LoginComponent();
  const register = new RegisterComponent();
  const home = new HomeComponent();
  const task = new Task(id, name, deadline);
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;

  const router = new Navigo('/');
  router.on('/', () => {
    router.navigate('/login');
  });
  router.on('/login', () => {
    appContainer.appendChild(login.render());
  }).resolve();
  router.on('/register', () => {
    appContainer.appendChild(register.render());
  }).resolve();
  router.on('/home', () => {
    appContainer.appendChild(home.render());
  }).resolve();
  router.on('/project/:id', () => {
    appContainer.appendChild(task.render());
  }).resolve();
};

export default Router;
