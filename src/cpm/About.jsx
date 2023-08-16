import React from 'react';
import WhatsAppLink from './WhatsApp';
import EmailAddress from './EmailAddress';
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="about-container">
      <section className='contact'>
        <h1>SEND ME A MESSAGE!</h1>
        {/* <h2 className="">About</h2> */}
        <ul className="nav-links">
          <li>+972 (0) 528 891567</li>
          <li>avigailtamuz@gmail.com</li>
          <li><Link to="https://www.instagram.com/gulitamuz_photography/">Instagram</Link></li>
        </ul>
      </section>
      <section>
        <img src='https://res.cloudinary.com/dcwibf9o5/image/upload/v1691998110/nkuti5izrkwqwfzyhrfn.png' />
      </section>
      {/* <ul className="nav-links">
        <EmailAddress emailAddress="avigailtamuz@gmail.com" /> 
        <WhatsAppLink phoneNumber="0528891567" />
        <Link to="https://www.instagram.com/gulitamuz_photography/">
          <i className="fa-brands fa-instagram"  style={{color: "#262627"}}></i>
        </Link>
        </ul> */}
    </section>
  );
};

export default About;