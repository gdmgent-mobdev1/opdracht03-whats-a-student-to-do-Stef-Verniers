/* eslint-disable no-trailing-spaces */
export default class Header {
  header: HTMLHeadElement;

  nav: any;

  ul: any;

  li: any;

  render() {
    this.header = document.createElement('header');
    const li = document.createElement('li');
    li.classList.add('nav-li');
    
    this.nav = document.createElement('nav');
    this.nav.setAttribute('id', 'top-nav');

    this.ul = document.createElement('ul');
    this.ul.setAttribute('id', 'top-nav-ul');

    li.setAttribute('id', 'nav-home');
    li.innerText = 'Home';

    li.setAttribute('id', 'dashBoardName');
    li.innerText = 'Stef';

    li.setAttribute('id', 'nav-logout');
    li.innerText = 'Log Out';

    this.ul.appendChild(li);
    this.nav.appendChild(this.ul);
    this.header.appendChild(this.nav);
  }
}
