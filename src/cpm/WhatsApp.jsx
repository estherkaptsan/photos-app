import React from 'react';
import { Link } from 'react-router-dom';

const WhatsAppLink = ({ phoneNumber }) => {
  // Replace spaces with '+' in the phone number
  const whatsappNumber = phoneNumber.replace(/\s/g, '+');

  // Construct the WhatsApp link with the phone number
  const link = `https://wa.me/${whatsappNumber}`;

  return (
    <Link to={link} target="_blank">
      <i className="fa-brands fa-whatsapp" style={{color: "#262627"}}></i>
    </Link>
  );
};

export default WhatsAppLink;
