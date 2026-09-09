import styles from "./PrivacyPolicy.module.css";

function PrivacyPolicy() {
    return (
        <section className={styles.page}>

            <div className={styles.container}>

                <header className={styles.header}>
                    <span className={styles.eyebrow}>
                        YOUR PRIVACY
                    </span>

                    <h1>Privacy Policy</h1>

                    <p>
                        This Privacy Policy explains how Arusuvai Sweets
                        collects, uses, and protects information when you
                        use our website and services.
                    </p>
                </header>

                <div className={styles.content}>

                    <section>
                        <h2>1. Information We Collect</h2>

                        <p>
                            When you create an account, place an order, or
                            use our services, we may collect information
                            necessary to provide our services.
                        </p>

                        <ul>
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Delivery address</li>
                            <li>Location information used for delivery distance calculation</li>
                            <li>Order and payment-related information</li>
                        </ul>
                    </section>

                    <section>
                        <h2>2. How We Use Your Information</h2>

                        <p>
                            We use the information we collect to provide and
                            manage our services, including:
                        </p>

                        <ul>
                            <li>Creating and managing your account</li>
                            <li>Processing and delivering your orders</li>
                            <li>Calculating delivery availability and charges</li>
                            <li>Processing online payments</li>
                            <li>Sending order confirmations and important order updates</li>
                            <li>Responding to customer enquiries and support requests</li>
                            <li>Managing cancellations, refunds, and replacements</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Location Information</h2>

                        <p>
                            Our website may request your location when you
                            use delivery services. This information is used
                            to determine whether delivery is available and
                            to calculate the applicable delivery charge.
                        </p>

                        <p>
                            Location information is used for delivery-related
                            purposes and is not required for customers who
                            do not use delivery services.
                        </p>
                    </section>

                    <section>
                        <h2>4. Online Payments</h2>

                        <p>
                            Online payments are processed through our payment
                            service provider. Arusuvai Sweets does not
                            directly store your complete card, UPI, or other
                            sensitive payment credentials.
                        </p>

                        <p>
                            Payment processing is handled through the payment
                            provider's systems and is subject to its
                            applicable terms and privacy practices.
                        </p>
                    </section>

                    <section>
                        <h2>5. Google Sign-In</h2>

                        <p>
                            If you choose to sign in using Google, we may
                            receive information provided by Google that is
                            necessary to authenticate your account, such as
                            your name and email address.
                        </p>

                        <p>
                            This information is used to create or access your
                            Arusuvai Sweets account and provide our services.
                        </p>
                    </section>

                    <section>
                        <h2>6. Order Communications</h2>

                        <p>
                            We may use your email address and phone number to
                            communicate important information relating to
                            your account and orders.
                        </p>

                        <p>
                            This may include order confirmations, delivery
                            updates, refund notifications, and customer
                            support communications.
                        </p>
                    </section>

                    <section>
                        <h2>7. Information Sharing</h2>

                        <p>
                            We do not sell your personal information.
                        </p>

                        <p>
                            We may share necessary information with service
                            providers involved in operating our services,
                            such as payment providers and delivery or courier
                            partners, when required to fulfil your order or
                            provide the requested service.
                        </p>
                    </section>

                    <section>
                        <h2>8. Data Security</h2>

                        <p>
                            We take reasonable measures to protect the
                            information associated with your account and
                            orders against unauthorized access, alteration,
                            disclosure, or destruction.
                        </p>

                        <p>
                            However, no method of transmitting or storing
                            information electronically can be guaranteed to
                            be completely secure.
                        </p>
                    </section>

                    <section>
                        <h2>9. Data Retention</h2>

                        <p>
                            We retain information for as long as reasonably
                            necessary to provide our services, maintain order
                            records, resolve disputes, comply with applicable
                            requirements, and protect our legitimate business
                            interests.
                        </p>
                    </section>

                    <section>
                        <h2>10. Your Information</h2>

                        <p>
                            If you have questions about the personal
                            information associated with your account or wish
                            to raise a privacy-related concern, please
                            contact us using the details below.
                        </p>
                    </section>

                    <section>
                        <h2>11. Children's Privacy</h2>

                        <p>
                            Our services are intended for general customers
                            and are not specifically directed toward
                            children. We do not knowingly request or collect
                            personal information from children for purposes
                            unrelated to providing our services.
                        </p>
                    </section>

                    <section>
                        <h2>12. Changes to This Policy</h2>

                        <p>
                            We may update this Privacy Policy when our
                            services, practices, or applicable requirements
                            change. Any updated version will be made
                            available on this page.
                        </p>
                    </section>

                    <section className={styles.contactSection}>
                        <h2>13. Contact Us</h2>

                        <p>
                            If you have any questions or concerns regarding
                            this Privacy Policy, please contact us:
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

export default PrivacyPolicy;