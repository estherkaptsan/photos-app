import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetEmail } from '../store/actions/user.actions';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  // Retrieve state properties from Redux
  const passwordResetEmailSent = useSelector(state => state.userModule.passwordResetEmailSent);
  const passwordResetError = useSelector(state => state.userModule.passwordResetError);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setIsSubmitting(true); // Disable the submit button

    try {
      await dispatch(sendPasswordResetEmail(email));
      setSuccessMessage('Password reset email sent successfully! Please check your inbox.');
      setErrorMessage('');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error sending password reset email. Please try again.');
      console.log('Error sending password reset email:', error);
    } finally {
      setIsSubmitting(false);  
    }
  };

  return (
    <div className="reset-password-page welcome">
      <form className="reset-password-form login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="reset-label">Email:</label>
        <input
          type="email"
          id="email"
          className="reset-input input-field"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="reset-button submit-button"
          disabled={isSubmitting}  
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
      <div className="message-container">
        {successMessage && passwordResetEmailSent && (
          <p className="success-message">{successMessage}</p>
        )}
        {errorMessage && passwordResetError && (
          <p className="error-message">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
