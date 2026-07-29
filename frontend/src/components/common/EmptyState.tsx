import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  message?: string;
}

function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
    </div>
  );
}

export default EmptyState;