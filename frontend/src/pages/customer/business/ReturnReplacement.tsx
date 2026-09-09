import styles from "./ReturnReplacement.module.css";

function ReturnReplacement() {
    return (
        <section className={styles.page}>

            <div className={styles.container}>

                <header className={styles.header}>
                    <span className={styles.eyebrow}>
                        PRODUCT SUPPORT
                    </span>

                    <h1>Return & Replacement</h1>

                    <p>
                        We want every order to reach you in good condition.
                        If there is a genuine issue with your order, please
                        contact us so that we can review and assist you.
                    </p>
                </header>

                <div className={styles.content}>

                    <section>
                        <h2>1. When to Contact Us</h2>

                        <p>
                            Please contact us if you receive an order containing
                            a product that is:
                        </p>

                        <ul>
                            <li>Damaged</li>
                            <li>Different from what you ordered</li>
                            <li>Spoiled or otherwise not in acceptable condition</li>
                        </ul>
                    </section>

                    <section>
                        <h2>2. How to Report an Issue</h2>

                        <p>
                            Please contact us as soon as possible after
                            receiving your order and explain the issue with
                            the product.
                        </p>

                        <p>
                            Email is the preferred method for reporting
                            product concerns. You may also contact us by
                            phone if required.
                        </p>

                        <div className={styles.infoCard}>
                            <span>Preferred Contact</span>

                            <strong>
                                support@arusuvaisweets.in
                            </strong>

                            <p>
                                Please include your order number and details
                                of the issue when contacting us.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2>3. Review of the Concern</h2>

                        <p>
                            Every reported issue will be reviewed before a
                            replacement or redelivery is confirmed.
                        </p>

                        <p>
                            We may request additional information or evidence
                            about the issue to help us properly understand
                            the concern.
                        </p>
                    </section>

                    <section>
                        <h2>4. Replacement or Redelivery</h2>

                        <p>
                            If the issue is reviewed and confirmed as a
                            genuine product or order concern, we may provide
                            a free replacement or redelivery as appropriate.
                        </p>

                        <div className={styles.steps}>

                            <div>
                                <span>01</span>
                                <strong>Contact Us</strong>
                                <p>
                                    Report the issue with your order.
                                </p>
                            </div>

                            <div>
                                <span>02</span>
                                <strong>Review</strong>
                                <p>
                                    We review the reported concern.
                                </p>
                            </div>

                            <div>
                                <span>03</span>
                                <strong>Resolution</strong>
                                <p>
                                    A replacement or redelivery may be
                                    provided after confirmation.
                                </p>
                            </div>

                        </div>
                    </section>

                    <section>
                        <h2>5. Incorrect Products</h2>

                        <p>
                            If you receive a product that is different from
                            the product included in your order, please contact
                            us with your order number and details.
                        </p>

                        <p>
                            After reviewing and confirming the issue, we may
                            arrange a replacement or redelivery as appropriate.
                        </p>
                    </section>

                    <section>
                        <h2>6. Damaged Products</h2>

                        <p>
                            If a product arrives damaged, please contact us
                            promptly with details of the damage.
                        </p>

                        <p>
                            After review and confirmation, we may arrange a
                            free replacement or redelivery.
                        </p>
                    </section>

                    <section>
                        <h2>7. Spoiled Products</h2>

                        <p>
                            If you believe that a product received is spoiled
                            or not in acceptable condition, please contact us
                            as soon as possible.
                        </p>

                        <p>
                            We will review the concern and, if confirmed,
                            provide an appropriate resolution.
                        </p>
                    </section>

                    <section>
                        <h2>8. General Returns</h2>

                        <p>
                            We do not offer general returns simply because a
                            customer changes their mind after receiving an
                            order.
                        </p>

                        <p>
                            Product-related concerns are handled according to
                            the issue and the review process described above.
                        </p>
                    </section>

                    <section className={styles.contactSection}>
                        <h2>9. Contact Us</h2>

                        <p>
                            For return or replacement concerns, please contact:
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

export default ReturnReplacement;