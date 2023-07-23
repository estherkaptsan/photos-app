import React from 'react';
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="about">
      <h2 className="">About</h2>
      <ul className="nav-links">
        <li>+972 (0) 528 891567</li>
        <li><Link to="https://www.instagram.com/gulitamuz_photography/">Instagram</Link></li>
      </ul>

    </section>
  );
};

export default About;
