import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendPasswordResetEmail } from '../store/actions/user.actions'; // Import the new function

export default function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await dispatch(sendPasswordResetEmail(email));
      // Handle success (display a message to the user or redirect)
    } catch (error) {
      console.log('Error sending password reset email:', error);
      // Handle error (display an error message to the user)
    }
  };

  return (
    <div className="login-page welcome">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="input-field"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="submit-button">
          Send Reset Email
        </button>
      </form>
    </div>
  );
}
