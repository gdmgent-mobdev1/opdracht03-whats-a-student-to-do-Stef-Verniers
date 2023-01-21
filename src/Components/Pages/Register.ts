/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from '../../lib/Component';
import { app } from '../../lib/firebase';
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
    registerContainer.setAttribute('id', 'registerPage');
    registerContainer.innerHTML = `
    <h1>Thanks for using Opus</h1>
    <h2>Fill out this form and get started</h2>
    <form id='register-form' class='register-form'>
      <p class='error hidden'>Dit is een error</p> 
      <label for='username' class='form-label'>Username</label>
        <input type='text' class='form-input' name='username' id='registerName'></input>
      <label for='email' class='form-label'>Email</label>
        <input type='text' class='form-input' name='usermail' id='registerEmail'></input>
      <label for='password' class='form-label'>Password</label>
        <input type='password' class='form-input' name='password' id='registerPassword'></input>
      <button type='submit' id='register-button' class='primary-button'>Register</button>
      <a href="/"><p>Already have an account? Click here to log in</p></a>
    </form>
    `;

    return registerContainer;
  }
}

export default RegisterComponent;
