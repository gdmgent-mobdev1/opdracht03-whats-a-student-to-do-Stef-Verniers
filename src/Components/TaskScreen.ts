/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from '../lib/Component';
import Task from './Task';
// import Elements from '../lib/Elements';

class TaskComponent extends Component {
  constructor() {
    super({
      name: 'task',
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('id', 'task');
    return taskContainer;
  }
}

export default TaskComponent;
