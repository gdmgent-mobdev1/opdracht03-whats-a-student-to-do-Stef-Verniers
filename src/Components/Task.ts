export default class Task {
  id: string;

  task: HTMLDivElement;

  taskNameContainer: HTMLDivElement;

  taskName: string;

  taskNameHeading: HTMLHeadingElement;

  leaderbords:HTMLButtonElement;

  addTask: HTMLFormElement;

  addTaskButton: HTMLButtonElement;

  countdownContainer: HTMLDivElement;

  countdownType: HTMLHeadingElement;

  countdown: string;

  taskList: HTMLDivElement;

  listItem: HTMLDivElement;

  p?: HTMLParagraphElement;

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
    this.task.innerHTML = `
    <header>
      <nav id="top-nav">
          <ul id="top-nav-ul">
              <li class="nav-li" id="nav-home">Home</li>
              <li class="nav-li" id="dashboardName">Home</li>
              <li class="nav-li" id="nav-logout">Log out</li>
          </ul>
      </nav>
      <div id='dashboardEdits-form' class="editOpen">
      <form id='dashboardEdits' class='edit-form'>
        <div id='practicalDisplayname'>
          <label for='displayname' class='form-label'>Username</label>
          <input type='text' class='form-input' id="displaynameInput" name='displayname'></input>
        </div>
      </form>
      <div id='editButtonsList'>
        <button id="confirmEdits" class="primary-button">Save edits</button>
        <button id="cancelEdits" class="secondary-button">Cancel</button>
      </div>
    </div>
    </header>
  `;

    this.taskNameContainer = document.createElement('div');
    this.taskNameContainer.setAttribute('id', 'thisTaskName');
    this.taskNameHeading = document.createElement('h2');
    this.taskNameHeading.innerText = this.taskName;
    this.taskNameContainer.appendChild(this.taskNameHeading);

    this.addTaskButton = document.createElement('button');
    this.addTaskButton.innerText = 'Create new project!';
    this.addTaskButton.setAttribute('id', 'addNewTask');

    this.countdownContainer = document.createElement('div');
    this.countdownContainer.setAttribute('id', 'thisCountdown');
    this.countdownType = document.createElement('h3');
    this.countdownType.innerText = this.countdown;
    this.countdownContainer.appendChild(this.countdownType);

    this.taskList = document.createElement('div');
    this.taskList.setAttribute('id', 'taskList');
    this.listItem = document.createElement('div');
    this.listItem.setAttribute('id', 'listItem');
    this.p.innerHTML = this.subtaskName;
    this.currentStatus = document.createElement('img');
    this.currentStatus.setAttribute('src', '/src/img/info.svg');
    this.listItem.appendChild(this.p);
    this.listItem.appendChild(this.currentStatus);

    this.task.appendChild(this.taskNameContainer);
    this.task.appendChild(this.countdownContainer);
    this.task.appendChild(this.taskList);
    return this.task;
  }
}
