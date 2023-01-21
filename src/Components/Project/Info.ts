export default class Info {
  id: string;

  name: string;

  deadline: string;

  descriptionText: HTMLDivElement;

  description: string;

  usersInfo: HTMLDivElement;

  users: string;

  redirect: HTMLAnchorElement;

  info: HTMLDivElement;

  modal: HTMLDivElement;

  modalContainer: HTMLDivElement;

  close: HTMLImageElement;

  closeInfo:HTMLDivElement;

  h2?: HTMLHeadingElement;

  p?: HTMLParagraphElement;

  deadlineLabel: HTMLLabelElement;

  descriptionLabel: HTMLLabelElement;

  usersLabel: HTMLLabelElement;

  constructor(
    projectTitle: string,
    projectDeadline: string,
    projectDescription: string,
    ProjectUsers: string,
    id: string,
  ) {
    this.name = projectTitle;
    this.deadline = projectDeadline;
    this.description = projectDescription;
    this.users = ProjectUsers;
    this.id = id;
  }

  render() {
    const info = document.querySelector<HTMLDivElement>('#showDocumentInfo');

    this.modal = document.createElement('div');
    this.modal.classList.add('modalInfo');

    this.modalContainer = document.createElement('div');
    this.modalContainer.setAttribute('id', 'projectInfoTools');

    this.closeInfo = document.createElement('div');
    this.closeInfo.setAttribute('id', 'closeInfo');
    this.close = document.createElement('img');
    this.close.setAttribute('src', '/src/img/close_white.svg');
    this.close.setAttribute('id', 'closeProjectInfo');
    this.close.setAttribute('width', '15vw');
    this.closeInfo.appendChild(this.close);

    this.h2 = document.createElement('h2');
    this.h2.innerText = this.name;

    this.deadlineLabel = document.createElement('label');
    this.deadlineLabel.classList.add('infoLabel');
    this.deadlineLabel.innerText = 'Deadline';
    this.p = document.createElement('p');
    this.p.innerText = this.deadline;

    this.descriptionLabel = document.createElement('label');
    this.descriptionLabel.classList.add('infoLabel');
    this.descriptionLabel.innerText = 'Description';
    this.descriptionText = document.createElement('div');
    this.descriptionText.setAttribute('id', 'projectDescription');
    this.descriptionText.innerText = this.description;

    this.usersLabel = document.createElement('label');
    this.usersLabel.classList.add('infoLabel');
    this.usersLabel.innerText = 'Users';
    this.usersInfo = document.createElement('div');
    this.usersInfo.setAttribute('id', 'usersList');
    this.usersInfo.innerHTML = this.users;

    this.redirect = document.createElement('a');
    this.redirect.classList.add('third-button');
    this.redirect.innerText = 'Go to this project';
    this.redirect.setAttribute('id', `${this.id}`);
    this.redirect.setAttribute('href', `/project/${this.id}`);


    this.modalContainer.appendChild(this.closeInfo);
    this.modalContainer.appendChild(this.h2);
    this.modalContainer.appendChild(this.deadlineLabel);
    this.modalContainer.appendChild(this.p);
    this.modalContainer.appendChild(this.descriptionLabel);
    this.modalContainer.appendChild(this.descriptionText);
    this.modalContainer.appendChild(this.usersLabel);
    this.modalContainer.appendChild(this.usersInfo);
    this.modalContainer.appendChild(this.redirect);
    this.modal.appendChild(this.modalContainer);
    info!.appendChild(this.modal);
    info!.classList.add('show');
    this.close.addEventListener('click', () => {
      info!.classList.remove('show');
      info!.removeChild(this.modal);
    });

    return this.info;
  }
}
