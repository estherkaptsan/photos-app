import React from 'react';

const ContactUs = () => {
  return (
    <section className="contact-us">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Message" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
