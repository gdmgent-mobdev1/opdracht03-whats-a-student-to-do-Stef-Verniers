/* eslint-disable import/no-cycle */
import {
  updateDashboard, createProject, logoutUser, returnSubtasks, createSubtask,
} from './firebase';

const todaysDate = () => {
  const date = new Date().toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  return date;
};

const convertFirebaseDate = (date: any) => {
  const convertDate = date.toDate();
  const formattedDate = convertDate.toLocaleString('nl-BE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formattedDate.toString();
};

window.setTimeout(() => {
  const showEditBlock = (e: any) => {
    e.preventDefault();
    const editBlock = document.querySelector<HTMLDivElement>('#dashboardEdits-form');
    if (!editBlock?.classList.contains('open')) {
      editBlock?.classList.add('open');
    }
  };

  const hideEditBlock = (e: any) => {
    e.preventDefault();
    const editBlock = document.querySelector<HTMLDivElement>('#dashboardEdits-form');
    if (editBlock?.classList.contains('open')) {
      editBlock.classList.remove('open');
    }
  };

  const createNewProject = () => {
    const open = document.querySelector<HTMLImageElement>('#newProject');
    const modal = document.querySelector<HTMLDivElement>('#createProjectContainer');
    const close = document.querySelector<HTMLImageElement>('#closeNewProjectForm');

    open?.addEventListener('click', () => {
      modal?.classList.add('show');
    });

    close?.addEventListener('click', () => {
      modal?.classList.remove('show');
      document.querySelector<HTMLFormElement>('#formCreateProject')?.reset();
    });
  };

  const createNewSubtask = () => {
    const open = document.querySelector<HTMLButtonElement>('#addNewTask');
    const modal = document.querySelector<HTMLDivElement>('#createSubtaskContainer');
    const close = document.querySelector<HTMLImageElement>('#closeNewSubtaskForm');

    open?.addEventListener('click', () => {
      modal?.classList.add('show');
    });

    close?.addEventListener('click', () => {
      modal?.classList.remove('show');
      document.querySelector<HTMLFormElement>('#formCreateSubtask')?.reset();
    });
  };

  const dashboardUpdateButton = document.querySelector<HTMLButtonElement>('#confirmEdits');
  dashboardUpdateButton?.addEventListener('click', updateDashboard);

  // Renders out the current date in a specific layout
  const renderDate = document.querySelector<HTMLSpanElement>('#currentDate');
  if (renderDate) renderDate.innerHTML = `Today is ${todaysDate()}`;

  // Shows the edit block for the username
  const editButton = document.querySelector<HTMLHeadElement>('#dashBoardName');
  const editBlock = document.querySelector<HTMLDivElement>('#dashboardEdits-form');
  const editBlockCancel = document.querySelector<HTMLButtonElement>('#cancelEdits');
  editButton?.addEventListener('click', showEditBlock);
  editBlockCancel?.addEventListener('click', hideEditBlock);

  // Stores new project data to firestore
  const submitNewProject = document.querySelector<HTMLButtonElement>('#confirmNewProject');
  submitNewProject?.addEventListener('click', createProject);

  // Stores a new sub task to firestore
  const submitNewSubtask = document.querySelector<HTMLButtonElement>('#confirmNewSubtask');
  submitNewSubtask?.addEventListener('click', createSubtask);

  createNewProject();
  returnSubtasks();
  createNewSubtask();

  const $homeButton = document.querySelector('#nav-home');
  const $logoutButton = document.querySelector('#logOut');
  $homeButton?.addEventListener('click', () => {
    window.location.href = '/home';
  });
  $logoutButton?.addEventListener('click', logoutUser);
  window.addEventListener('unload', logoutUser);
}, 2000);


export {
  todaysDate, convertFirebaseDate,
};
