import styles from "./Contact.module.css";

function Contact() {
    return (
        <section className={styles.page}>

            <div className={styles.container}>

                <header className={styles.header}>
                    <span className={styles.eyebrow}>
                        GET IN TOUCH
                    </span>

                    <h1>Contact Us</h1>

                    <p>
                        Have a question about our sweets, bulk orders,
                        custom sweet boxes, or catering services?
                        We would be happy to hear from you.
                    </p>
                </header>

                <div className={styles.grid}>

                    <div className={styles.card}>

                        <span className={styles.icon}>📍</span>

                        <h2>Visit Us</h2>

                        <p>
                            <strong>Arusuvai Catering</strong>
                            <br />
                            19/9 Kumarananthapuram, 7th Street
                            <br />
                            West Manipal Store Opp
                            <br />
                            Tiruppur Corporation Ward 22
                            <br />
                            Tamil Nadu – 641602
                        </p>

                    </div>

                    <div className={styles.card}>

                        <span className={styles.icon}>📞</span>

                        <h2>Call Us</h2>

                        <p>
                            For enquiries, bulk orders, catering,
                            functions, and other requirements.
                        </p>

                        <a
                            href="tel:+919443178984"
                            className={styles.link}
                        >
                            +91 94431 78984
                        </a>

                    </div>

                    <div className={styles.card}>

                        <span className={styles.icon}>✉️</span>

                        <h2>Email Us</h2>

                        <p>
                            For order-related questions, support,
                            delivery concerns, and business enquiries.
                        </p>

                        <a
                            href="mailto:support@arusuvaisweets.in"
                            className={styles.link}
                        >
                            support@arusuvaisweets.in
                        </a>

                    </div>

                </div>

                <div className={styles.enquiry}>

                    <div>
                        <span className={styles.label}>
                            BUSINESS ENQUIRIES
                        </span>

                        <h2>
                            Planning a Large Order?
                        </h2>

                        <p>
                            Contact us for wedding and function orders,
                            corporate requirements, bulk and wholesale
                            orders, or custom sweet boxes. We can discuss
                            your requirements and agree on the appropriate
                            quantity and delivery time.
                        </p>
                    </div>

                    <a
                        href="mailto:support@arusuvaisweets.in"
                        className={styles.button}
                    >
                        Email Us
                    </a>

                </div>

                <div className={styles.note}>

                    <h2>Order Support</h2>

                    <p>
                        If you have a concern regarding a delivered order,
                        including a damaged, wrong, or spoiled product,
                        please contact us so that we can review the issue
                        and assist you appropriately.
                    </p>

                    <p>
                        For delivery delays or other order-related concerns,
                        email is the preferred method of contact.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default Contact;