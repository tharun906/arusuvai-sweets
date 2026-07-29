import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <h3>Arusuvai Sweets</h3>
          <p>Traditional sweets and catering, made fresh in Tiruppur.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <a href="#categories">Sweets</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h4>Reach Us</h4>
          <p>Tiruppur, Tamil Nadu</p>
          <p>+91 00000 00000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Arusuvai Sweets. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;