export default class ListItem {
  id: string;

  listItem: any;

  h4?: HTMLHeadingElement;

  name: string;

  status: boolean;

  constructor(
    subtaskId: string,
    subtaskName: string,
    currentStatus: boolean,
  ) {
    this.id = subtaskId;
    this.name = subtaskName;
    this.status = currentStatus;
  }

  render() {
    this.listItem = document.createElement('li');
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
    this.listItem.appendChild(this.h4);

    const list = document.querySelector('#taskList');
    list?.appendChild(this.listItem);
    return this.listItem;
  }
}
