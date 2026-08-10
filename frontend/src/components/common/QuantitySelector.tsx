import "./QuantitySelector.css";

interface QuantitySelectorProps {

    value: number;

    min?: number;

    max?: number;

    disabled?: boolean;

    onChange: (value: number) => void;

}

function QuantitySelector({

    value,

    min = 1,

    max = 99,

    disabled = false,

    onChange,

}: QuantitySelectorProps) {

    const decrease = () => {

        if (value > min) {

            onChange(value - 1);

        }

    };

    const increase = () => {

        if (value < max) {

            onChange(value + 1);

        }

    };

    return (

        <div className="quantity-selector">

            <button

                type="button"

                onClick={decrease}

                disabled={disabled || value <= min}

            >

                −

            </button>

            <span>

                {value}

            </span>

            <button

                type="button"

                onClick={increase}

                disabled={disabled || value >= max}

            >

                +

            </button>

        </div>

    );

}

export default QuantitySelector;