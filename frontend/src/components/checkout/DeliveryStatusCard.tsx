import Card from "../common/Card";
import Badge from "../common/Badge";

import styles from "./DeliveryStatusCard.module.css";

interface DeliveryStatusCardProps {

    distance: number;

    message: string;

    codAvailable: boolean;

}

function DeliveryStatusCard({

    distance,

    message,

    codAvailable,

}: DeliveryStatusCardProps) {

    return (

        <Card className={styles.card}>

            <h2>

                Delivery Status

            </h2>

            <div className={styles.row}>

                <span>

                    Distance

                </span>

                <strong>

                    {distance.toFixed(2)} km

                </strong>

            </div>

            <div className={styles.row}>

                <span>

                    Service

                </span>

                <Badge

                    variant={

                        codAvailable

                            ? "success"

                            : "warning"

                    }

                >

                    {

                        codAvailable

                            ? "COD Available"

                            : "Online Only"

                    }

                </Badge>

            </div>

            <p className={styles.message}>

                {message}

            </p>

        </Card>

    );

}

export default DeliveryStatusCard;