import React from 'react';
import {Link} from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app-header">
            <nav className="navbar">
                <a href="#" className="logo">
                    My Photography
                </a>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#">Gallery</a></li>
                    <li><a href="#">Services</a></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
