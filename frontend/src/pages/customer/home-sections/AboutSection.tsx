import './AboutSection.css';

function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-inner">
        <div className="about-copy">
          <span className="eyebrow">Our Story</span>
          <h2>Rooted in Tiruppur, made with arusuvai — true taste.</h2>
          <p>
            Arusuvai Sweets began as a family kitchen serving Tiruppur&apos;s
            festivals and weddings, and grew into a name trusted for its
            catering and traditional mithai alike. We still measure ghee by
            hand and cook in small batches, because that&apos;s the only way
            we know how to keep the taste consistent — box after box, year
            after year.
          </p>
        </div>
        <div className="about-visual" aria-hidden="true" />
      </div>
    </section>
  );
}

export default AboutSection;