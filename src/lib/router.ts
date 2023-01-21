import Navigo from 'navigo';
import {
  HomeComponent, LoginComponent, RegisterComponent, NewTaskComponent,
} from '../Components';
import Task from '../Components/Pages/Project';
import Subtask from '../Components/Pages/Subtask';

const id: any = sessionStorage.getItem('projectId');
const name: any = sessionStorage.getItem('projectName');
const deadline: any = sessionStorage.getItem('projectDeadline');

const subId: any = sessionStorage.getItem('taskId');
const subName: any = sessionStorage.getItem('taskName');
const subFinish: any = sessionStorage.getItem('taskFinish');
const subPend: any = sessionStorage.getItem('taskPend');
const subSpend: any = sessionStorage.getItem('taskSpend');
const subTimer: any = sessionStorage.getItem('taskTimer');

const Router = () => {
  const login = new LoginComponent();
  const register = new RegisterComponent();
  const home = new HomeComponent();
  const newTask = new NewTaskComponent();
  const task = new Task(id, name, deadline);
  const subtaskPage = new Subtask(subId, subName, subFinish, subPend, subSpend, subTimer);
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
  router.on('/subtask/:id', () => {
    if (check) {
      appContainer.appendChild(subtaskPage.render());
    } else {
      window.location.replace('/login');
    }
  }).resolve();
};

export default Router;
