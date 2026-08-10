import "./Card.css";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

function Card({
    children,
    className = "",
    hover = true,
    onClick,
}: CardProps) {

    return (
        <div
            onClick={onClick}
            className={`
                card
                ${hover ? "card-hover" : ""}
                ${className}
            `}
        >
            {children}

        </div>
    );
}

export default Card;