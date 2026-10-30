
import styles from "./OrderProcessingOverlay.module.css";
import loadingLogo from "../../assets/Loading/Loading.png";

function OrderProcessingOverlay() {
    return (
        <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby="processing-title"
            aria-describedby="processing-description"
        >
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <img
                        src={loadingLogo}
                        alt="Arusuvai Sweets"
                        className={styles.logo}
                    />
                </div>

                <h2 id="processing-title">
                    Processing Your Order...
                </h2>

                <p id="processing-description">
                    Please wait while we confirm your payment
                    and create your order.
                </p>

                <div className={styles.dots} aria-label="Processing">
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </div>
    );
}

export default OrderProcessingOverlay;
