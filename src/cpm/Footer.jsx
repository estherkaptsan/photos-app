import React from 'react'
import WhatsAppLink from './WhatsApp';
import EmailAddress from './EmailAddress';
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
        {/* <ul className="nav-links">
        <EmailAddress emailAddress="avigailtamuz@gmail.com" /> 
        <WhatsAppLink phoneNumber="0528891567" />
        <Link to="https://www.instagram.com/gulitamuz_photography/">
          <i className="fa-brands fa-instagram"  style={{color: "#262627"}}></i>
        </Link>
        </ul> */}

        <p>Copyright 2004-2023 © Avigail Tamuz</p>
    </footer>
  )
}
