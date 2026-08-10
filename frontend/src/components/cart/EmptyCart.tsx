import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import Card from "../common/Card";

import { ROUTES } from "../../constants/routes";

import styles from "./EmptyCart.module.css";

function EmptyCart() {

    const navigate = useNavigate();

    return (

        <div className={styles.container}>

            <Card className={styles.card}>

                <div className={styles.icon}>

                    🛒

                </div>

                <h2>

                    Your Cart is Empty

                </h2>

                <p>

                    Looks like you haven't added any sweets yet.

                </p>

                <Button

                    onClick={() =>
                        navigate(ROUTES.HOME)
                    }

                >

                    Continue Shopping

                </Button>

            </Card>

        </div>

    );

}

export default EmptyCart;