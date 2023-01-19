/* eslint-disable no-trailing-spaces */
export default class Header {
  header: HTMLHeadElement;

  nav: any;

  ul: any;

  liHome: any;

  liName: any;

  liLogout: any;

  userName: string;

  editInfo: HTMLDivElement;

  constructor(
    name: any,

  ) {
    this.userName = name;
  }

  render() {
    this.header = document.createElement('header');
    const li = document.createElement('li');
    
    this.nav = document.createElement('nav');
    this.nav.setAttribute('id', 'top-nav');

    this.ul = document.createElement('ul');
    this.ul.setAttribute('id', 'top-nav-ul');

    this.liHome = document.createElement('li');
    this.liHome.setAttribute('id', 'nav-home');
    this.liHome.classList.add('nav-li');
    this.liHome.innerText = 'Home';

    this.liName = document.createElement('li');
    this.liName.setAttribute('id', 'dashBoardName');
    this.liName.setAttribute('value', this.userName);
    this.liName.innerHTML = `Welcome ${this.userName}`;
    this.liName.classList.add('nav-li');

    this.liLogout = document.createElement('li');
    this.liLogout.setAttribute('id', 'logOut');
    this.liLogout.classList.add('nav-li');
    this.liLogout.innerText = 'Log Out';

    this.ul.appendChild(this.liHome);
    this.ul.appendChild(this.liName);
    this.ul.appendChild(this.liLogout);

    this.editInfo = document.createElement('div');
    this.editInfo.setAttribute('id', 'dashboardEdits-form');
    this.editInfo.classList.add('editOpen');
    this.editInfo.innerHTML = `
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
  `;

    this.nav.appendChild(this.ul);
    this.header.appendChild(this.nav);
    this.header.appendChild(this.editInfo);
    return this.header;
  }
}
