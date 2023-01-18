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

export {
  todaysDate, showEditBlock, hideEditBlock, createNewProject, convertFirebaseDate,
};
