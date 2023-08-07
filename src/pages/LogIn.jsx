import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/actions/user.actions';
import {Link} from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password
    };
    const success = await dispatch(login(credentials));

    if (success) {
      setLoginSuccess(true);
      setLoginFailed(false);
    } else {
      setLoginSuccess(false);
      setLoginFailed(true);
    }

    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loggedInUser) {
    return (
      <section className='welcome'>
      <div className='login-form'>
        <p>Welcome, {loggedInUser.name}!</p>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
      </section>
    );
  }

  return (
    <section className='login-page'>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="input-field"
          placeholder='Enter your e-mail '
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="input-field"
          placeholder='Password'
        />
        <br />
        <button type="submit" className="submit-button">
          Log In
        </button>
        <Link to='/reset/password' >forget password</Link>
        {loginSuccess && <p>Login successful!</p>}
        {loginFailed && <p>Login failed. Please check your credentials.</p>}
      </form>
    </section>

  );
};

export default LoginForm;
