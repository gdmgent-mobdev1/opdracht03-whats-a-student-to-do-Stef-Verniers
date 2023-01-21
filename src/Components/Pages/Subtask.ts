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

  stopCountingDiv: HTMLDivElement;

  counting: string;

  countingText: any;

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
    this.subtaskPage = document.createElement('div');
    this.subtaskPage.setAttribute('id', 'subDetail');

    this.subtaskContainer = document.createElement('div');
    this.subtaskContainer.setAttribute('id', 'subTaskTitleContainer');
    this.subtaskHeading = document.createElement('h2');
    this.subtaskHeading.innerText = this.subtask;
    this.subtaskContainer.appendChild(this.subtaskHeading);

    this.statusContainer = document.createElement('div');
    this.statusContainer.setAttribute('id', 'subTaskStatusContainer');
    this.statusHeading = document.createElement('h3');
    this.statusHeading.innerText = 'In progress';
    this.statusContainer.appendChild(this.statusHeading);

    this.timeContainer = document.createElement('div');
    this.timeContainer.setAttribute('id', 'subTaskTimeContainer');
    this.timeHeading = document.createElement('p');
    this.timeHeading.innerText = this.time;
    this.timeContainer.appendChild(this.timeHeading);
    this.subtaskContainer.appendChild(this.subtaskHeading);

    this.startCounterDiv = document.createElement('div');
    this.startCounterDiv.setAttribute('id', 'startCounting');
    this.startCounterDiv.innerText = 'Start Counting';

    this.counterDiv = document.createElement('div');
    this.counterDiv.setAttribute('id', 'subTaskCounter');
    this.countingText = document.createElement('p');
    this.countingText.setAttribute('id', 'timerText');
    this.countingText.innerText = '00:00';
    this.counterDiv.appendChild(this.startCounterDiv);
    this.counterDiv.appendChild(this.countingText);

    this.stopCountingDiv = document.createElement('div');
    this.stopCountingDiv.setAttribute('id', 'stopCounting');
    this.stopCountingDiv.innerText = 'Stop the Clock';
    this.counterDiv.appendChild(this.stopCountingDiv);

    this.subtaskPage.appendChild(this.subtaskContainer);
    this.subtaskPage.appendChild(this.statusContainer);
    this.subtaskPage.appendChild(this.timeContainer);
    this.subtaskPage.appendChild(this.counterDiv);
    return this.subtaskPage;
  }
}
