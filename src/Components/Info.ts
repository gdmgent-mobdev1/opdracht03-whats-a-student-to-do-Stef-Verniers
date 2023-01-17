export default class {
  id: string;

  name: string;

  deadline: string;

  descriptionText: HTMLDivElement;

  description: string;

  usersInfo: HTMLDivElement;

  users: string;

  redirect: HTMLButtonElement;

  info: HTMLDivElement;

  modal: HTMLDivElement;

  close: HTMLImageElement;

  closeInfo:HTMLDivElement;

  h2?: HTMLHeadingElement;

  p?: HTMLParagraphElement;

  constructor(
    projectTitle: string,
    projectDeadline: string,
    projectDescription: string,
    ProjectUsers: string,
  ) {
    this.name = projectTitle;
    this.deadline = projectDeadline;
    this.description = projectDescription;
    this.users = ProjectUsers;
  }

  render() {
    this.info = document.createElement('div');
    this.info.classList.add('info-container');
    this.info.setAttribute('id', 'showInfoContainer');
    this.info.id = this.id;

    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    this.closeInfo = document.createElement('div');
    this.closeInfo.setAttribute('id', 'closeInfo');
    this.close = document.createElement('img');
    this.close.setAttribute('src', '/src/img/close.svg');
    this.closeInfo.appendChild(this.close);

    this.h2 = document.createElement('h2');
    this.h2.innerText = this.name;

    this.p = document.createElement('p');
    this.p.innerText = this.deadline;

    this.descriptionText = document.createElement('div');
    this.descriptionText.setAttribute('id', 'projectDescription');
    this.descriptionText.innerText = this.description;

    this.usersInfo = document.createElement('div');
    this.usersInfo.setAttribute('id', 'usersList');
    this.usersInfo.innerHTML = this.users;

    this.redirect = document.createElement('button');
    this.redirect.classList.add('primary-button');
    this.redirect.setAttribute('id', `${this.id}`);


  }
}