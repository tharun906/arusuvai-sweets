import "./Price.css";

interface PriceProps {

    amount: number;

    size?: "sm" | "md" | "lg";

}

function Price({

    amount,

    size = "md",

}: PriceProps) {

    return (

        <span className={`price price-${size}`}>

            ₹{amount.toLocaleString("en-IN")}

        </span>

    );

}

export default Price;