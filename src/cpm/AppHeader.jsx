import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const location = useLocation();
    
    const isHomePage = location.pathname === '/';

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
        !isHomePage && (<header className="app-header">
            <nav className="navbar">
                <Link to="/" className="logo">
                    Avigail Tamuz
                </Link>

                {!isMenuOpen && (<button className='btn-toggle' onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>)}
                {isMenuOpen && (<button className='btn-toggle' onClick={toggleMenu}
                ><i className="fa-solid fa-bars fa-rotate-90"></i>
                </button>)}
            </nav>

            {isMenuOpen && (
                <div className='menu' onClick={toggleMenu}>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        {loggedInUser && (
                            <li><Link to="/photo/edit">Edit</Link></li>
                        )}
                        <li><Link to="/about">About</Link></li>
                        {/* <li><Link to="/login">login</Link></li> */}
                    </ul>
                </div>
            )}
        </header>
        )
    )
}

export default AppHeader 