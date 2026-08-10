import "./Button.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?:
        | "primary"
        | "secondary"
        | "outline"
        | "danger";
    size?:
        | "sm"
        | "md"
        | "lg";

    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
}

function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
}: ButtonProps) {

    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                btn
                btn-${variant}
                btn-${size}
                ${fullWidth ? "btn-full" : ""}
            `}
        >
            { loading ? "Loading..."  : children  }
        </button>
    );
}

export default Button;