import React, { useState } from 'react';

function Login() {
  return (
    <>
      <input
        type="text"
        data-testid="email-input"
        placeholder="E-mail"
      />

      <input
        type="password"
        data-testid="password-input"
        placeholder="Senha"
      />

      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </>
  );
}

export default Login;
