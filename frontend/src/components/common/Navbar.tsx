import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar-brand-badge">A</span>
          <span className="navbar-brand-text">Arusuvai Sweets</span>
        </Link>

        <button
          className="navbar-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          <a href="#categories" onClick={() => setMenuOpen(false)}>
            Sweets
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>
            Track Order
          </Link>
          <Link to="/cart" className="navbar-cart" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;