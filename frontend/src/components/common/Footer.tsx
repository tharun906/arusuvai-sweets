import styles from "./Footer.module.css";

import { APP_NAME } from "../../constants/appConstants";

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

                    <a href="/">Home</a>

                    <a href="/orders">Orders</a>

                    <a href="/cart">Cart</a>

                </div>

                <div className={styles.contact}>

                    <h3>Contact</h3>

                    <p>Kumarananthapuram, Tiruppur, Tamil Nadu</p>

                    <p>+91 94431 78984</p>

                    <p>support@arusuvaisweets.in</p>

                </div>

            </div>

            <div className={styles.bottom}>

                © {year} {APP_NAME}. All Rights Reserved.

            </div>

        </footer>

    );

}

export default Footer;