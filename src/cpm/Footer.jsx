import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    isHomePage && (<footer className="footer">
      <div className='copyright'>
        <p>Copyright 2023 © Avigail Tamuz</p>
      </div>
    </footer>)
  )
}
