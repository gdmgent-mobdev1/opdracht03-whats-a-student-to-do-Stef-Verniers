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
        <strong><h2>Home under construction</h2></strong>
    `;

    return homeContainer;
  }
}

export default HomeComponent;
