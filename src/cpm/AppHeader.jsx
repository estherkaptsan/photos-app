import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsMenuOpen(false)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className="app-header">
            <nav className="navbar">
                <Link to="/" className="logo">
                    AVIGAIL
                </Link>

                <button className='btn-toggle' onClick={toggleMenu}><i className="fa-solid fa-bars"></i></button>
            </nav>
            {isMenuOpen && (
                <section className='menu' onClick={toggleMenu}>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        {loggedInUser && (
                            <li><Link to="/photo/edit">Edit</Link></li>
                        )}
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/login">login</Link></li>
                    </ul>
                </section>
            )}

        </header>
    )
}

export default AppHeader 