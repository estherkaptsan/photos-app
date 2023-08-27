import React from 'react';
import { Link } from 'react-router-dom';

const WhatsAppLink = ({ phoneNumber }) => {
  const whatsappNumber = phoneNumber.replace(/\s/g, '+');
  const link = `https://wa.me/${whatsappNumber}`;

  return (
    <Link to={link} target="_blank">
      <i className="fa-brands fa-whatsapp" style={{color: "#262627"}}></i>
    </Link>
  );
};

export default WhatsAppLink;
