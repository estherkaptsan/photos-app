import React from 'react';
import {Link} from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app-header">
            <nav className="navbar">
                <Link to="/" className="logo">
                    My Photography
                </Link>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/edit">Edit</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
