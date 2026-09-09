import styles from "./ShippingDelivery.module.css";

function ShippingDelivery() {
    return (
        <section className={styles.page}>

            <div className={styles.container}>

                <header className={styles.header}>
                    <span className={styles.eyebrow}>
                        DELIVERY INFORMATION
                    </span>

                    <h1>Shipping & Delivery</h1>

                    <p>
                        We aim to prepare and deliver your sweets as quickly
                        as possible while maintaining the quality of every
                        order.
                    </p>
                </header>

                <div className={styles.content}>

                    <section>
                        <h2>1. Local Delivery</h2>

                        <p>
                            Local delivery is available within our applicable
                            delivery area around Tiruppur.
                        </p>

                        <div className={styles.deliveryCards}>

                            <div className={styles.deliveryCard}>
                                <span className={styles.distance}>
                                    Up to 5 km
                                </span>

                                <strong>Free Delivery</strong>

                                <p>
                                    Delivery charge: ₹0
                                </p>
                            </div>

                            <div className={styles.deliveryCard}>
                                <span className={styles.distance}>
                                    Above 5 km – Up to 10 km
                                </span>

                                <strong>Local Delivery</strong>

                                <p>
                                    Delivery charge: ₹40
                                </p>
                            </div>

                        </div>
                    </section>

                    <section>
                        <h2>2. Local Delivery Time</h2>

                        <p>
                            Orders within our local delivery area are
                            generally delivered on the same day or by the
                            following day.
                        </p>

                        <p>
                            Delivery time may vary depending on the order,
                            preparation requirements, delivery conditions,
                            and operational circumstances.
                        </p>
                    </section>

                    <section>
                        <h2>3. Courier Delivery</h2>

                        <p>
                            Orders beyond our local delivery area may be
                            delivered through our courier partner,
                            <strong> Sabari Express</strong>.
                        </p>

                        <p>
                            Courier delivery is generally expected to take
                            approximately 2–3 days.
                        </p>

                        <p>
                            The applicable courier delivery charge is
                            calculated based on the total order weight and
                            courier cost applicable to the order.
                        </p>
                    </section>

                    <section>
                        <h2>4. Payment for Courier Orders</h2>

                        <p>
                            Orders requiring courier delivery are available
                            through online payment only.
                        </p>

                        <p>
                            Cash on Delivery is not available for orders
                            beyond the applicable local COD delivery area.
                        </p>
                    </section>

                    <section>
                        <h2>5. Delivery Address</h2>

                        <p>
                            Customers are responsible for providing a
                            complete and accurate delivery address, including
                            the door number, street, city, state, pincode,
                            and other relevant location details.
                        </p>

                        <p>
                            Incorrect or incomplete address information may
                            cause delivery delays or prevent successful
                            delivery.
                        </p>
                    </section>

                    <section>
                        <h2>6. Delivery Delays</h2>

                        <p>
                            While we make reasonable efforts to deliver orders
                            within the expected timeframe, delays may occur
                            due to circumstances such as courier delays,
                            weather, traffic, operational issues, or other
                            circumstances outside our reasonable control.
                        </p>

                        <p>
                            If you experience a delivery delay or have a
                            concern regarding your order, please contact us.
                            Email is the preferred method of contact for
                            delivery-related concerns.
                        </p>
                    </section>

                    <section>
                        <h2>7. Bulk and Special Orders</h2>

                        <p>
                            Bulk, wholesale, wedding, function, corporate,
                            and custom sweet-box orders may require additional
                            preparation time.
                        </p>

                        <p>
                            Delivery or collection timing for such orders will
                            be based on the time agreed with the customer when
                            the order is confirmed.
                        </p>
                    </section>

                    <section>
                        <h2>8. Delivery Availability</h2>

                        <p>
                            Delivery availability and the applicable delivery
                            charge are determined during checkout based on
                            the customer's delivery location.
                        </p>

                        <p>
                            If delivery is not available for a particular
                            location, the customer will not be able to
                            complete the applicable delivery order through
                            the website.
                        </p>
                    </section>

                    <section className={styles.contactSection}>
                        <h2>9. Delivery Support</h2>

                        <p>
                            If you have any questions about delivery, please
                            contact us:
                        </p>

                        <div className={styles.contact}>
                            <strong>Arusuvai Catering</strong>

                            <span>
                                19/9 Kumarananthapuram, 7th Street,
                                West Manipal Store Opp,
                                Tiruppur Corporation Ward 22,
                                Tamil Nadu – 641602
                            </span>

                            <a href="tel:+919443178984">
                                +91 94431 78984
                            </a>

                            <a href="mailto:support@arusuvaisweets.in">
                                support@arusuvaisweets.in
                            </a>
                        </div>
                    </section>

                </div>

            </div>

        </section>
    );
}

export default ShippingDelivery;