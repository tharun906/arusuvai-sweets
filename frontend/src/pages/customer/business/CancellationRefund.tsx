import styles from "./CancellationRefund.module.css";

function CancellationRefund() {
    return (
        <section className={styles.page}>

            <div className={styles.container}>

                <header className={styles.header}>
                    <span className={styles.eyebrow}>
                        CANCELLATION & REFUNDS
                    </span>

                    <h1>Cancellation & Refund Policy</h1>

                    <p>
                        This policy explains when an order can be cancelled
                        and how refunds are handled for online payments.
                    </p>
                </header>

                <div className={styles.content}>

                    <section>
                        <h2>1. Order Cancellation</h2>

                        <p>
                            Customers can cancel an eligible order while the
                            cancellation option is available on the order.
                        </p>

                        <p>
                            Cancellation availability depends on the order
                            status, payment method, and delivery type.
                        </p>

                        <p>
                            Once an order has progressed beyond the permitted
                            cancellation stage, it cannot be cancelled
                            through the website.
                        </p>
                    </section>

                    <section>
                        <h2>2. Cash on Delivery Orders</h2>

                        <p>
                            COD orders can be cancelled while the order is in
                            the permitted <strong>Preparing</strong> stage.
                        </p>

                        <div className={styles.infoCard}>
                            <span>COD Cancellation</span>
                            <strong>No Refund</strong>
                            <p>
                                No payment has been collected from the
                                customer at the time of cancellation.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2>3. Online Payment Orders</h2>

                        <p>
                            Orders paid through UPI or another online payment
                            method can be cancelled while they are in the
                            permitted <strong>Preparing</strong> stage.
                        </p>

                        <p>
                            Eligible online-payment cancellations receive a
                            refund of <strong>80% of the paid order amount</strong>.
                        </p>

                        <div className={styles.infoCard}>
                            <span>Online Payment Cancellation</span>
                            <strong>80% Refund</strong>
                            <p>
                                80% of the paid order amount will be refunded
                                to the original payment method.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2>4. Refund Process</h2>

                        <p>
                            Once an eligible online-payment cancellation is
                            confirmed, the applicable refund is initiated
                            through our payment gateway.
                        </p>

                        <p>
                            The refund is sent to the original payment method
                            used for the order.
                        </p>

                        <p>
                            After the refund is initiated, the time required
                            for the amount to appear in the customer's account
                            may depend on the bank, UPI provider, or payment
                            service provider.
                        </p>
                    </section>

                    <section>
                        <h2>5. Refund Example</h2>

                        <p>
                            For example, if the paid order amount is ₹1,000
                            and the customer cancels the eligible order,
                            the refund amount will be:
                        </p>

                        <div className={styles.calculation}>
                            <div>
                                <span>Paid Order Amount</span>
                                <strong>₹1,000</strong>
                            </div>

                            <div>
                                <span>Refund Percentage</span>
                                <strong>80%</strong>
                            </div>

                            <div className={styles.total}>
                                <span>Refund Amount</span>
                                <strong>₹800</strong>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2>6. Courier Orders</h2>

                        <p>
                            Courier orders paid through online payment may be
                            cancelled while they are in the permitted
                            <strong> Preparing</strong> stage.
                        </p>

                        <p>
                            Eligible cancellations are subject to the same
                            80% online-payment refund policy.
                        </p>

                        <p>
                            Once the order has been dispatched to the courier
                            partner, the customer cancellation option is no
                            longer available through the website.
                        </p>
                    </section>

                    <section>
                        <h2>7. Damaged, Wrong, or Spoiled Products</h2>

                        <p>
                            If you receive a product that is damaged, wrong,
                            or spoiled, please contact us as soon as possible
                            after delivery.
                        </p>

                        <p>
                            We will review the concern and, after confirming
                            the issue, may provide free redelivery or a
                            replacement as appropriate.
                        </p>

                        <p>
                            Please provide relevant details about the issue
                            when contacting us so that we can properly review
                            the concern.
                        </p>
                    </section>

                    <section>
                        <h2>8. Non-Eligible Cancellations</h2>

                        <p>
                            Orders that have already progressed beyond the
                            permitted cancellation stage cannot be cancelled
                            through the website.
                        </p>

                        <p>
                            Delivered orders cannot be cancelled.
                        </p>
                    </section>

                    <section className={styles.contactSection}>
                        <h2>9. Contact Us</h2>

                        <p>
                            If you have a question about an order cancellation,
                            refund, damaged product, wrong product, or spoiled
                            product, please contact us:
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

export default CancellationRefund;