import React from 'react';

export default function ResetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the logic to send the email here
  };

  return (
    <div className="login-page welcome">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" className="input-field" required />

        <button type="submit" className="submit-button">
          Send Reset Email
        </button>
      </form>
    </div>
  );
}
