import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { gapi } from 'gapi-script';

function Login() {
  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  });

  const verifyForm = () => {
    const emailFormat = /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]*\w$/;
    const minSize = 6;
    const isEmailValid = emailFormat.test(email);
    const isPasswordValid = password.length >= minSize;
    setButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  const handleInputChange = (target) => {
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'password') setPassword(target.value);
    verifyForm();
  };

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setLogin(true);
  };

  return (
    <form>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        onChange={ ({ target }) => handleInputChange(target) }
        placeholder="E-mail"
      />

      <input
        type="password"
        onChange={ ({ target }) => handleInputChange(target) }
        data-testid="password-input"
        name="password"
        placeholder="Senha"
      />

      <button
        disabled={ isButtonDisabled }
        onClick={ handleClick }
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
      {
        login && <Redirect to="/foods" />
      }
    </form>
  );
}

export default Login;
