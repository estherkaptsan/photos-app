import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    isHomePage && (<footer className="footer">
      <div className='copyright'>
      <p>Copyright 2020-2023 © Avigail Tamuz</p>
      </div>
<div className='icons-section'>
      <i class="fa-brands fa-instagram"></i>  
      <i class="fa-brands fa-whatsapp"></i>
      <i class="fa-regular fa-envelope"></i>
</div>
    </footer>)
  )
}
