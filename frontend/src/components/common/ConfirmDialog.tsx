import "./ConfirmDialog.css";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,

}: ConfirmDialogProps) {

    if (!open) return null;

    return (

        <div className="confirm-overlay">
            <div className="confirm-dialog">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="confirm-actions">
                    <button
                        className="confirm-cancel"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="confirm-ok"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;