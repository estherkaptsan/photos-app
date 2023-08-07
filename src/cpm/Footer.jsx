import React from 'react'
import WhatsAppLink from './WhatsApp';
import EmailAddress from './EmailAddress';
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className='icons-section'>
        {/* <ul className="nav-links"> */}
        <EmailAddress emailAddress="avigailtamuz@gmail.com" /> 
        <WhatsAppLink phoneNumber="0528891567" />
        <Link to="https://www.instagram.com/gulitamuz_photography/">
          <i className="fa-brands fa-instagram"  style={{color: "#262627"}}></i>
        </Link>
        {/* </ul> */}
      </div>
    </footer>
  )
}
