/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from '../lib/Component';
import { app } from '../lib/firebase';
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
    homeContainer.innerHTML = `
    <header>
      <nav id="top-nav">
          <ul id="top-nav-ul">
              <li class="nav-li" id="nav-home">Home</li>
              <li class="nav-li" id="dashboardName">Home</li>
              <li class="nav-li" id="nav-logout">Log out</li>
          </ul>
      </nav>
    </header>
    <main>
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
                    <img src='/src/img/close.svg' alt='Close this form' width='15vw' id='closeNewProjectForm'>
                  </div>
                  <label for='projectName' class='form-label'>Project name</label>
                  <input type='text' class='form-input' name='projectName'></input>
                  <label for='projectDeadline' class='form-label'>Project deadline</label>
                  <input type='date' class='form-input' name='projectDeadline'></input>
                  <label for='projectDescription' class='form-label'>Project description</label>
                  <textarea type='text' class='form-input' name='projectDeadline' rows='4' cols="50"></textarea>
                  <button id="confirmNewProject" class="primary-button">Create project</button>
                </form>
            </div>
        </div>
    </main>
    `;

    return homeContainer;
  }
}

export default HomeComponent;
