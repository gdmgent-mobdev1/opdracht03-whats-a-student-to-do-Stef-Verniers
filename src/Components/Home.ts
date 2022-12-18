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
    `;

    return homeContainer;
  }
}

export default HomeComponent;
