import "./Badge.css";

interface BadgeProps {
    children: React.ReactNode;
    variant?:
        | "success"
        | "warning"
        | "danger"
        | "info"
        | "secondary";
}

function Badge({
    children,
    variant = "secondary",
}: BadgeProps) {

    return (
        <span className={`badge badge-${variant}`}>{children}</span>
    );
}

export default Badge;