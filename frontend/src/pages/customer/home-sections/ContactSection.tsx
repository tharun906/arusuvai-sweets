import './ContactSection.css';

function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-inner">
        <div>
          <span className="eyebrow">Visit or Call</span>
          <h2>We&apos;d love to hear from you</h2>
        </div>

        <div className="contact-cards">
          <div className="contact-card">
            <h4>Address</h4>
            <p>Tiruppur, Tamil Nadu, India</p>
          </div>
          <div className="contact-card">
            <h4>Phone</h4>
            <p>+91 00000 00000</p>
          </div>
          <div className="contact-card">
            <h4>Hours</h4>
            <p>9:00 AM – 9:00 PM, all days</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;