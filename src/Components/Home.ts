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
              <li class="nav-li" id="nav-logout">Log out</li>
          </ul>
      </nav>
    </header>
    <main>
      <div id="dashboard" class="dashboard">
        <div class='dashboardUtils'>
          <h3 id="dashboardName"></h3>
          <span id="currentDate"></span>
        </div>
        <button id="editDashboard" class="secondary-button"></button>
      </div>
      <div id='dashboardEdits-form' class="editOpen">
        <form id='dashboardEdits' class='edit-form'>
          <div id='practicalDisplayname'>
            <label for='displayname' class='form-label'>Username</label>
            <input type='text' class='form-input' id="displaynameInput" name='displayname'></input>
          </div>
        </form>
        <button id="confirmEdits" class="secondary-button">Save edits</button>
      </div>
    </main>
    `;

    return homeContainer;
  }
}

export default HomeComponent;
