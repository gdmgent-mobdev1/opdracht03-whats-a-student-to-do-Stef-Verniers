/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from '../../lib/Component';
import Header from '../Header';
// import Elements from '../lib/Elements';

class HomeComponent extends Component {
  constructor() {
    super({
      name: 'home',
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const homeContainer = document.createElement('div');
    homeContainer.setAttribute('id', 'homeContainer');
    homeContainer.innerHTML = `
    <main>
      <div id="dashboard" class="dashboard">
        <div class='dashboardUtils'>
          <span id="currentDate"></span>
        </div>
      </div>
      <div id='amountMessage'>
        <h1 id='amountProjects'></h1>
        <img src='/src/img/add.svg' alt='Add new Project' width='30vw'/ id='newProject'>
      </div>
      <div id='projectList'></div>
      <div class="create-container" id="createProjectContainer">
            <div class="modal">
                <form id="formCreateProject" class="login-form">
                  <div id='projectCreateTools'>
                    <h3>Create a new project</h3>
                    <img src='/src/img/close_white.svg' alt='Close this form' width='15vw' id='closeNewProjectForm'>
                  </div>
                  <label for='projectName' class='form-label'>Project name</label>
                  <input type='text' class='form-input' name='projectName' id='newName'></input>
                  <label for='projectDeadline' class='form-label'>Project deadline</label>
                  <input type='date' class='form-input' name='projectDeadline' id='newDate'></input>
                  <label for='projectDescription' class='form-label'>Project description</label>
                  <textarea type='text' class='form-input' name='projectDeadline' rows='4' cols="50" id='newDescription'></textarea>
                  <button id="confirmNewProject" class="primary-button">Create project</button>
                </form>
            </div>
        </div>
        <div class="create-container" id="showDocumentInfo">
    </main>
    `;

    return homeContainer;
  }
}

export default HomeComponent;
