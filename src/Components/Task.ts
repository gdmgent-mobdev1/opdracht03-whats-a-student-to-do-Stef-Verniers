export default class Task {
  id: string;

  task: HTMLDivElement;

  taskNameContainer: HTMLDivElement;

  taskName: string;

  taskNameHeading: HTMLHeadingElement;

  group: HTMLDivElement;

  leaderboards:HTMLButtonElement;

  leaderIcon: HTMLDivElement;

  addTask: HTMLFormElement;

  addTaskButton: HTMLButtonElement;

  countdownContainer: HTMLDivElement;

  countdownType: HTMLHeadingElement;

  countdown: string;

  taskList: HTMLUListElement;

  listItem: HTMLDivElement;

  p?: HTMLParagraphElement;

  label: HTMLLabelElement;

  subtaskName: string;

  currentStatus: HTMLImageElement;

  constructor(
    id: string,
    thisTaskName: string,
    thisCountdown: string,
  ) {
    this.id = id;
    this.taskName = thisTaskName;
    this.countdown = thisCountdown;
    this.render();
  }

  render() {
    this.p = document.createElement('p');

    this.task = document.createElement('div');
    this.task.setAttribute('id', 'thisTask');

    this.taskNameContainer = document.createElement('div');
    this.taskNameContainer.setAttribute('id', 'thisTaskName');
    this.taskNameHeading = document.createElement('h2');
    this.taskNameHeading.innerText = this.taskName;
    this.taskNameContainer.appendChild(this.taskNameHeading);

    this.countdownContainer = document.createElement('div');
    this.countdownContainer.setAttribute('id', 'thisCountdown');
    this.countdownType = document.createElement('h3');
    this.countdownType.innerText = this.countdown;
    this.countdownContainer.appendChild(this.countdownType);

    this.group = document.createElement('div');
    this.group.setAttribute('id', 'leaderGroup');
    this.leaderboards = document.createElement('button');
    this.leaderboards.setAttribute('id', 'leaderBoards');
    this.leaderIcon = document.createElement('div');
    this.leaderIcon = document.createElement('div');
    this.leaderIcon.setAttribute('id', 'trophy');
    this.addTaskButton = document.createElement('button');
    this.addTaskButton.innerText = 'New subtask!';
    this.addTaskButton.setAttribute('id', 'addNewTask');
    this.leaderboards.appendChild(this.leaderIcon);
    this.group.appendChild(this.countdownContainer);
    this.group.appendChild(this.leaderboards);
    this.group.appendChild(this.addTaskButton);

    this.taskList = document.createElement('ul');
    this.taskList.setAttribute('id', 'taskList');
    this.listItem = document.createElement('div');
    this.listItem.setAttribute('id', 'listItem');
    this.p.innerHTML = this.subtaskName;
    this.currentStatus = document.createElement('img');
    this.currentStatus.setAttribute('src', '/src/img/info.svg');
    this.label = document.createElement('label');
    this.label.innerText = 'Tasks';
    this.label.setAttribute('id', 'taskLabel');
    this.taskList.appendChild(this.label);

    this.task.appendChild(this.taskNameContainer);
    this.task.appendChild(this.group);
    this.task.appendChild(this.taskList);
    return this.task;
  }
}
