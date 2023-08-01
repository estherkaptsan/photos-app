import React from 'react'
import WhatsAppLink from './WhatsApp';
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      {/* <div className="container">
      <p>&copy; 2023 Your Website. All rights reserved.</p>
    </div> */}
      <div className='icons-section'>
        {/* <ul className="nav-links"> */}
        <WhatsAppLink phoneNumber="0528891567" />
        <Link to="https://www.instagram.com/gulitamuz_photography/">
          <i className="fa-brands fa-instagram"></i>
        </Link>
        {/* </ul> */}
      </div>
    </footer>
  )
}
