import type { ProductWeight } from "../../types/CartItem";
import "./WeightSelector.css";


interface WeightSelectorProps {

    value: ProductWeight;

    disabled?: boolean;

    onChange: (weight: ProductWeight) => void;

}

const weights: ProductWeight[] = [

    "250g",

    "500g",

    "1kg",

];

function WeightSelector({

    value,

    disabled = false,

    onChange,

}: WeightSelectorProps) {

    return (

        <div className="weight-selector">

            {

                weights.map((weight) => (

                    <button

                        key={weight}

                        type="button"

                        disabled={disabled}

                        onClick={() => onChange(weight)}

                        className={`
                            weight-chip
                            ${
                                value === weight
                                    ? "weight-chip-active"
                                    : ""
                            }
                        `}

                    >

                        {weight}

                    </button>

                ))

            }

        </div>

    );

}

export default WeightSelector;