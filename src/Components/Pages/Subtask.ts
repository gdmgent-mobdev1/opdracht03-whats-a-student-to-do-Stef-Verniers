export default class Subtask {
  id: string;

  subtaskPage: HTMLDivElement;

  subtaskContainer: HTMLDivElement;

  subtask: string;

  subtaskHeading: HTMLHeadingElement;

  statusContainer: HTMLDivElement;

  request: boolean;

  completed: boolean;

  statusHeading: HTMLHeadingElement;

  timeContainer: HTMLDivElement;

  time: string;

  timeHeading: HTMLHeadingElement;

  counterDiv: HTMLDivElement;

  startCounterDiv: HTMLDivElement;

  startCounter: HTMLDivElement;

  startCounterIcon: HTMLImageElement;

  countingDiv: HTMLDivElement;

  counting: string;

  countingText: HTMLParagraphElement;

  stopCountingDiv: HTMLDivElement;

  stopCountingIcon: HTMLImageElement;

  constructor(
    id: string,
    name: string,
    isPending: boolean,
    isFinished: boolean,
    timeSpent: string,
    timer: string,
  ) {
    this.id = id;
    this.subtask = name;
    this.request = isPending;
    this.completed = isFinished;
    this.time = timeSpent;
    this.counting = timer;
  }

  render() {
    const div = document.createElement('div');
    const heading = document.createElement('h2');
    const subheading = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');

    this.subtaskPage = div;
    this.subtaskContainer.setAttribute('id', 'thisSubTaskName');
    this.subtaskHeading = heading;
    this.subtaskHeading.innerText = this.subtask;
    this.subtaskContainer.appendChild(this.subtaskHeading);


    this.statusContainer = div;
    this.statusContainer.setAttribute('id', 'thisSubTaskStatus');
    this.statusHeading = subheading;
    this.statusHeading.innerText = 'In progress';
    this.statusContainer.appendChild(this.statusHeading);
    this.subtaskPage.appendChild(this.subtaskContainer);


    this.timeContainer = div;
    this.timeContainer.setAttribute('id', 'thisSubTaskTimer');
    this.timeHeading = p;
    this.timeHeading.innerText = this.time;
    this.timeContainer.appendChild(this.timeHeading);
    this.subtaskPage.appendChild(this.timeContainer);


    this.counterDiv = div;
    this.startCounterDiv = div;
    this.startCounterIcon = img;
    this.startCounterIcon.setAttribute('id', 'startCounter');
    this.startCounterIcon.setAttribute('src', '/src/img/info.svg');
    this.counterDiv.appendChild(this.counterDiv);

    this.countingDiv = div;
    this.countingDiv.classList.add('isClosed');
    this.countingText = p;
    this.countingText.innerText = this.counting;
    this.stopCountingDiv = div;
    this.stopCountingIcon = img;
    this.stopCountingIcon.setAttribute('id', '/src/img/info.svg');
    this.stopCountingIcon.setAttribute('id', 'stopCounting');
    this.counterDiv.appendChild(this.countingDiv);
    return this.subtaskPage;
  }
}
