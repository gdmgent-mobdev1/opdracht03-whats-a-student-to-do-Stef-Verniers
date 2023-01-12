import { v4 as uuidv4 } from 'uuid';

export default class Card {
  id: string;

  name: string;

  h4?: HTMLHeadingElement;

  deadline: Date;

  users: number;

  userImage: HTMLImageElement;

  userSpan: HTMLSpanElement;

  card: HTMLDivElement;

  p?: HTMLParagraphElement;

  cardBottom: HTMLDivElement;

  cardUsers: HTMLDivElement;

  infoImage: HTMLImageElement;



  constructor(
    projectName: string,
    projectDeadline: Date,
    usersNumber: number,
    id = `_${uuidv4()}`,
  ) {
    this.id = id;
    this.name = projectName;
    this.deadline = projectDeadline;
    this.users = usersNumber;
    this.id = id;
    this.render();
  }

  render() {
    this.card = document.createElement('div');
    this.card.classList.add('projectCard');
    this.card.id = this.id;

    this.h4 = document.createElement('h4');
    this.h4.innerText = this.name;

    this.p = document.createElement('p');
    this.p.innerHTML = this.deadline.toUTCString();

    this.cardBottom = document.createElement('div');
    this.cardBottom.setAttribute('id', 'cardBottom');

    this.cardUsers = document.createElement('div');
    this.cardUsers.setAttribute('id', 'cardUsers');

    this.userImage = document.createElement('img');
    this.userImage.setAttribute('id', 'projectUsers');
    this.userImage.setAttribute('src', '/src/img/user.svg');
    this.userSpan = document.createElement('span');
    this.userSpan.innerText = this.users.toString();

    this.infoImage = document.createElement('img');
    this.infoImage.setAttribute('id', 'projectInfo');

    this.cardUsers.appendChild(this.userImage);
    this.cardUsers.appendChild(this.userSpan);
    this.cardBottom.appendChild(this.cardUsers);
    this.cardBottom.appendChild(this.infoImage);

    this.card.appendChild(this.h4);
    this.card.appendChild(this.p);
    this.card.appendChild(this.cardBottom);
    return this.card;
  }
}
