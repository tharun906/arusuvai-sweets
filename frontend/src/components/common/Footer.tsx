import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import { APP_NAME } from "../../constants/appConstants";
import { ROUTES } from "../../constants/routes";

function Footer() {

    const year = new Date().getFullYear();

    return (

        <footer className={styles.footer}>

            <div className={styles.container}>

                <div className={styles.brand}>

                    <h2>{APP_NAME}</h2>

                    <p>
                        Authentic Traditional Sweets
                        Crafted With Love & Quality.
                    </p>

                </div>

                <div className={styles.links}>

                    <h3>Quick Links</h3>

                    <Link to={ROUTES.HOME}>
                        Home
                    </Link>

                    <Link to={ROUTES.ABOUT}>
                        About Us
                    </Link>

                    <Link to={ROUTES.SERVICES}>
                        Services
                    </Link>

                    <Link to={ROUTES.CONTACT}>
                        Contact Us
                    </Link>

                    <Link to={ROUTES.ORDERS}>
                        Orders
                    </Link>

                    <Link to={ROUTES.CART}>
                        Cart
                    </Link>

                </div>

                <div className={styles.policies}>

                    <h3>Policies</h3>

                    <Link to={ROUTES.PRIVACY_POLICY}>
                        Privacy Policy
                    </Link>

                    <Link to={ROUTES.TERMS_AND_CONDITIONS}>
                        Terms & Conditions
                    </Link>

                    <Link to={ROUTES.SHIPPING_DELIVERY}>
                        Shipping & Delivery
                    </Link>

                    <Link to={ROUTES.CANCELLATION_REFUND}>
                        Cancellation & Refund
                    </Link>

                    <Link to={ROUTES.RETURN_REPLACEMENT}>
                        Return & Replacement
                    </Link>

                </div>

                <div className={styles.contact}>

                    <h3>Contact</h3>

                    <p>
                        Arusuvai Catering
                    </p>

                    <p>
                        19/9 Kumarananthapuram, 7th Street,
                        West Manipal Store Opp,
                        Tiruppur, Tamil Nadu – 641602
                    </p>

                    <a href="tel:+919443178984">
                        +91 94431 78984
                    </a>

                    <a href="mailto:support@arusuvaisweets.in">
                        support@arusuvaisweets.in
                    </a>

                </div>

            </div>

            <div className={styles.bottom}>

                © {year} {APP_NAME}. All Rights Reserved.

            </div>

        </footer>
    );
}

export default Footer;