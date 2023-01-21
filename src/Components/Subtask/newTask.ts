/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from '../../lib/Component';
// import Elements from '../lib/Elements';

class NewTaskComponent extends Component {
  constructor() {
    super({
      name: 'newTask',
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const newTaskContainer = document.createElement('div');
    newTaskContainer.setAttribute('id', 'newTaskContainer');
    newTaskContainer.innerHTML = `
    <main>
      <div class="create-container" id="createSubtaskContainer">
            <div class="modal">
                <form id="formCreateSubtask" class="login-form">
                  <div id='projectCreateTools'>
                    <h3>Create a new sub task</h3>
                    <img src='/src/img/close.svg' alt='Close this form' width='15vw' id='closeNewSubtaskForm'>
                  </div>
                  <label for='subtaskName' class='form-label'>Sub task name:</label>
                  <input type='text' class='form-input' name='subtaskName' id='newSubtaskName'></input>
                  <label for='subtaskDescription' class='form-label'>Sub task description</label>
                  <textarea type='text' class='form-input' name='subtaskDescription' rows='4' cols="50" id='newSubtaskDescription'></textarea>
                  <label for='subtaskUser' class='form-label'>Who'll do this task?</label>
                  <select type='select' class='form-input' name='subtaskUser' id='newSubtaskUser'>
                    <option>Stef Verniers</option>
                  </select>
                  <button id="confirmNewSubtask" class="primary-button">Create sub task</button>
                </form>
            </div>
        </div>
    </main>
    `;

    return newTaskContainer;
  }
}

export default NewTaskComponent;
