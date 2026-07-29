import './OrnamentDivider.css';

function OrnamentDivider() {
  return (
    <div className="ornament-divider" aria-hidden="true">
      <span className="ornament-line" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="14" cy="14" rx="12" ry="8" stroke="#0F6B64" strokeWidth="1.4" />
        <ellipse cx="14" cy="14" rx="6" ry="4" fill="#D89B34" />
        <circle cx="14" cy="14" r="1.6" fill="#7A1B2E" />
      </svg>
      <span className="ornament-line" />
    </div>
  );
}

export default OrnamentDivider;