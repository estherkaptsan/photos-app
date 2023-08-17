import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import EmailAddress from './EmailAddress';
import WhatsAppLink from './WhatsApp';



export default function Footer() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    isHomePage && (<footer className="footer">
      <div className='copyright'>
        <p>Copyright 2020-2023 © Avigail Tamuz</p>
      </div>
      <div className='icons-section'>
        <Link to="https://www.instagram.com/gulitamuz_photography/"> <i class="fa-brands fa-instagram"></i> </Link>
        <WhatsAppLink phoneNumber="0528891567" />
        <EmailAddress emailAddress="avigailtamuz@gmail.com" />
      </div>
    </footer>)
  )
}
