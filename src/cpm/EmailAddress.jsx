import React from 'react';

const EmailAddress = ({ emailAddress }) => {
  const mailtoLink = `mailto:${emailAddress}`;

  return (
    <a href={mailtoLink}>
      <i className="fa-regular fa-envelope" style={{color: "#2b2b2c"}}></i>
    </a>
  );
};

export default EmailAddress;