import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/user.actions';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the login action
    const success = await dispatch(login(username, password));

    if (success) {
      // Set login success state and display a success message
      setLoginSuccess(true);
      setLoginFailed(false);
      console.log('Login successful!');
    } else {
      // Set login failure state and display a failure message
      setLoginSuccess(false);
      setLoginFailed(true);
      console.log('Invalid credentials');
    }

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="input-field"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="input-field"
        />
      </label>
      <br />
      <button type="submit" className="submit-button">Log In</button>

      {loginSuccess && <p>Login successful!</p>}
      {loginFailed && <p>Login failed. Please check your credentials.</p>}
    </form>
  );
};

export default LoginForm;
