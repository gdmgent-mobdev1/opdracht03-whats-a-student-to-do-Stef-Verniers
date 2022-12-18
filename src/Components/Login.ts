import Component from '../lib/Component';
// import app from '../lib/firebase';
// import Elements from '../lib/Elements';

class LoginComponent extends Component {
  constructor() {
    super({
      name: 'login',
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const loginContainer = document.createElement('div');
    loginContainer.innerHTML = `
    <h1>Opus</h1>
    <form id='login-form' class='login-form'>
      <label for='username' class='form-label'>Name</label>
        <input type='text' class='form-input' name='username'></input>
      <label for='password' class='form-label'>Password</label>
        <input type='password' class='form-input' name='password'></input>
      <button type='submit' id='login-button' class='primary-button'>Login</button>
      <button type='submit' id='login-google' class='secondary-button'>Login with Google</button>
    </form>
    `;

    return loginContainer;
  }
}

export default LoginComponent;
