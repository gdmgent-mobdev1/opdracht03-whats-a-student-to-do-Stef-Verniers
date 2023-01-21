import Navigo from 'navigo';
import {
  HomeComponent, LoginComponent, RegisterComponent, NewTaskComponent,
} from '../Components';
import Task from '../Components/Pages/Project';

const id: any = sessionStorage.getItem('projectId');
const name: any = sessionStorage.getItem('projectName');
const deadline: any = sessionStorage.getItem('projectDeadline');

const Router = () => {
  const login = new LoginComponent();
  const register = new RegisterComponent();
  const home = new HomeComponent();
  const newTask = new NewTaskComponent();
  const task = new Task(id, name, deadline);
  const appContainer = document.querySelector<HTMLDivElement>('#app')!;
  const check = sessionStorage.getItem('user');


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
  router.on('/home', async () => {
    if (check) {
      appContainer.appendChild(home.render());
    } else {
      window.location.replace('/login');
    }
  }).resolve();
  router.on('/project/:id', () => {
    if (check) {
      appContainer.appendChild(task.render());
      appContainer.appendChild(newTask.render());
    } else {
      window.location.replace('/login');
    }
  }).resolve();
};

export default Router;
