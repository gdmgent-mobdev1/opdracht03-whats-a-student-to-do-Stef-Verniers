/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from '../lib/Component';
import { app } from '../lib/firebase';
// import Elements from '../lib/Elements';

class RegisterComponent extends Component {
  constructor() {
    super({
      name: 'register',
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const registerContainer = document.createElement('div');
    registerContainer.innerHTML = `
    <h1>Thanks for using Opus</h1>
    <h2>Fill out this form and get started</h2>
    <form id='register-form' class='login-form'>
      <label for='username' class='form-label'>Email</label>
        <input type='text' class='form-input' name='username'></input>
      <label for='password' class='form-label'>Password</label>
        <input type='password' class='form-input' name='password'></input>
      <button type='submit' id='register-button' class='primary-button'>Register</button>
    </form>
    `;

    return registerContainer;
  }
}

export default RegisterComponent;
