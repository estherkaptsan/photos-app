import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Footer from './Footer';


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
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li> 
                        <li><Link to="/login">login</Link></li>
                    </ul>
                    {/* <div className='icons-section'>
                        <WhatsAppLink phoneNumber="0528891567" />
                        <Link to="https://www.instagram.com/gulitamuz_photography/">
                            <i className="fa-brands fa-instagram"></i>
                        </Link>
                    </div> */}
                    <Footer />
                </div>
            )}
        </header>
    )
}

export default AppHeader 