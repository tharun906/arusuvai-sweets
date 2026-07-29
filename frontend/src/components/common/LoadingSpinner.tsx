import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  label?: string;
}

function LoadingSpinner({ label = 'Loading' }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <span className="loading-spinner-ring" aria-hidden="true" />
      <span className="loading-spinner-label">{label}</span>
    </div>
  );
}

export default LoadingSpinner;