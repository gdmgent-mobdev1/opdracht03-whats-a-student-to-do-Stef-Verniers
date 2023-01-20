import { doc } from '@firebase/firestore';

export default class ListItem {
  id: string;

  listItem: any;

  startDiv: HTMLDivElement;

  h4?: HTMLHeadingElement;

  name: string;

  status: boolean;

  arrow: HTMLImageElement;

  extension: HTMLDivElement;

  descriptionDiv: HTMLDivElement;

  descriptionLabel: HTMLLabelElement;

  description: string;

  userDiv: HTMLDivElement;

  userLabel: HTMLLabelElement;

  user: string;

  timeDiv: HTMLDivElement;

  timeLabel: HTMLLabelElement;

  time: string;

  descriptionP: HTMLParagraphElement;

  userP: HTMLParagraphElement;

  timeP: HTMLParagraphElement;

  constructor(
    subtaskId: string,
    subtaskName: string,
    currentStatus: boolean,
    subtaskDescription: string,
    subtaskUser: string,
    subtaskTime: string,
  ) {
    this.id = subtaskId;
    this.name = subtaskName;
    this.status = currentStatus;
    this.description = subtaskDescription;
    this.user = subtaskUser;
    this.time = subtaskTime;
  }

  render() {
    this.descriptionP = document.createElement('p');
    this.userP = document.createElement('p');
    this.timeP = document.createElement('p');
    this.startDiv = document.createElement('div');
    this.listItem = document.createElement('li');
    this.arrow = document.createElement('img');
    this.arrow.classList.add('arrow');
    this.arrow.setAttribute('id', `arrow-${this.id}`);
    this.arrow.setAttribute('src', '/src/img/arrow.svg');
    this.listItem.classList.add('subtaskItem');
    this.listItem.setAttribute('id', this.id);
    this.h4 = document.createElement('h4');
    this.h4.innerText = this.name;
    this.listItem.setAttribute('value', this.status);
    this.listItem.classList.add(this.status);
    if (this.status === false) {
      this.listItem.classList.add('false');
    } else {
      this.listItem.classList.add('true');
    }

    this.startDiv.appendChild(this.h4);
    this.startDiv.appendChild(this.arrow);
    this.listItem.appendChild(this.startDiv);

    this.startDiv.classList.add('startDiv');
    this.extension = document.createElement('div');
    this.descriptionDiv = document.createElement('div');
    this.userDiv = document.createElement('div');
    this.timeDiv = document.createElement('div');

    this.extension.appendChild(this.descriptionDiv);

    this.descriptionLabel = document.createElement('label');
    this.descriptionLabel.classList.add('label');
    this.descriptionLabel.innerHTML = 'Description:';
    this.descriptionP.innerText = this.description;
    this.descriptionDiv.appendChild(this.descriptionLabel);
    this.descriptionDiv.appendChild(this.descriptionP);
    this.descriptionDiv.classList.add('first');
    this.extension.classList.add('editOpen');
    this.extension.setAttribute('id', `extend-${this.id}`);
    this.listItem.appendChild(this.extension);

    this.userLabel = document.createElement('label');
    this.userLabel.classList.add('label');
    this.userLabel.innerHTML = 'User working on it:';
    this.userP.innerText = this.user;
    this.userDiv.appendChild(this.userLabel);
    this.userDiv.appendChild(this.userP);
    this.extension.appendChild(this.userDiv);

    this.timeLabel = document.createElement('label');
    this.timeLabel.classList.add('label');
    this.timeLabel.innerHTML = 'Time spent:';
    this.timeP.innerText = this.time;
    this.timeDiv.appendChild(this.timeLabel);
    this.timeDiv.appendChild(this.timeP);
    this.timeDiv.classList.add('last');
    this.extension.appendChild(this.timeDiv);


    const list = document.querySelector('#taskList');
    list?.appendChild(this.listItem);

    const toggleArrow = document.querySelector<HTMLImageElement>(`#arrow-${this.id}`);
    const editExtend = document.querySelector<HTMLDivElement>(`#extend-${this.id}`);
    const currentRotation = 0;
    const showExtendedBlock = (e: any) => {
      e.preventDefault();
      editExtend?.classList.toggle('openMargin');
      toggleArrow!.style.rotate = `${currentRotation} += 90deg`;
    };
    toggleArrow?.addEventListener('click', showExtendedBlock);
    return this.listItem;
  }
}
