import React from 'react';
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="about-container">
      <section className='contact'>
        <h1>SEND ME A MESSAGE!</h1>
        <ul className="nav-links">
          <li>+972 (0) 528 891567</li>
          <li>avigailtamuz@gmail.com</li>
          <li><Link to="https://www.instagram.com/gulitamuz_photography/">Instagram</Link></li>
        </ul>
      </section>
      <section>
        <img src='https://res.cloudinary.com/dq9ms8jsq/image/upload/v1723120221/m9jydbe4oor5xbh2zyjv.jpg' />
      </section>
    </section>
  );
};

export default About;