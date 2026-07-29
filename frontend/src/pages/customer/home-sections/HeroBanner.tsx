import Button from '../../../components/common/Button';
import './HeroBanner.css';

function HeroBanner() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Arusuvai Sweets · Tiruppur</span>
          <h1 className="hero-headline">
            Ghee, sugar, and three generations of getting it right.
          </h1>
          <p className="hero-subhead">
            Every box is prepared fresh, the traditional way — no shortcuts,
            no preservatives. From everyday mithai to festival orders and
            catering, it&apos;s the same recipe your grandmother would approve of.
          </p>
          <div className="hero-actions">
            <a href="#categories">
              <Button variant="primary">Explore Sweets</Button>
            </a>
            <a href="#contact">
              <Button variant="outline">Get in Touch</Button>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-badge-frame">
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="110" cy="150" r="34" fill="#D89B34" />
              <circle cx="80" cy="120" r="30" fill="#B87F22" />
              <circle cx="140" cy="120" r="30" fill="#D89B34" />
              <circle cx="110" cy="95" r="26" fill="#B87F22" />
              <circle cx="110" cy="95" r="8" fill="#7A1B2E" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;