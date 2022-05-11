import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import chefToque from '../images/chefToque.svg';
import recipesApp from '../images/recipesApp.svg';
import '../index.css';
import '../styles/Login.css';

function Login() {
  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [password, setPassword] = useState('');

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
    <div className="Login">
      <div className="logo-div">
        <img width="48" height="42" src={ chefToque } alt="Chef Toque" />
        <img src={ recipesApp } alt="Recipes App" />
      </div>
      <form className="login-form">
        <label htmlFor="email">
          <span>Login</span>
          <input
            type="text"
            id="email"
            data-testid="email-input"
            name="email"
            onChange={ ({ target }) => handleInputChange(target) }
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            type="password"
            onChange={ ({ target }) => handleInputChange(target) }
            data-testid="password-input"
            name="password"
            placeholder="Senha"
          />
        </label>
        <button
          disabled={ isButtonDisabled }
          onClick={ handleClick }
          type="submit"
          className="login-btn"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
        {
          login && <Redirect to="/foods" />
        }
      </form>
    </div>
  );
}

export default Login;
