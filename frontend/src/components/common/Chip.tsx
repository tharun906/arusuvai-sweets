import "./Chip.css";

interface ChipProps {

    children: React.ReactNode;

    active?: boolean;

    onClick?: () => void;

}

function Chip({

    children,

    active = false,

    onClick,

}: ChipProps) {

    return (

        <button

            onClick={onClick}

            className={`

                chip

                ${active ? "chip-active" : ""}

            `}

        >

            {children}

        </button>

    );

}

export default Chip;