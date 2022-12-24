const todaysDate = () => {
  const date = new Date().toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
  return date;
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
  todaysDate, showEditBlock, hideEditBlock, createNewProject,
};
