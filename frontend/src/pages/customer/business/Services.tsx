import styles from "./Services.module.css";

function Services() {
    return (
        <section className={styles.page}>

            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.eyebrow}>WHAT WE OFFER</span>

                    <h1>Our Services</h1>

                    <p>
                        From everyday sweet orders to special celebrations,
                        Arusuvai offers traditional sweets and catering services
                        for different occasions and requirements.
                    </p>
                </div>

                <div className={styles.grid}>

                    <article className={styles.card}>
                        <div className={styles.icon}>🍬</div>
                        <h2>Online Sweet Orders</h2>
                        <p>
                            Order our traditional sweets online and have them
                            delivered to your doorstep within our service area.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <div className={styles.icon}>🎉</div>
                        <h2>Wedding & Function Orders</h2>
                        <p>
                            We provide sweets and catering support for weddings,
                            functions, celebrations, and other special occasions.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <div className={styles.icon}>📦</div>
                        <h2>Bulk & Wholesale Orders</h2>
                        <p>
                            Planning a large order? We accept bulk and wholesale
                            requirements based on quantity, product selection,
                            and agreed delivery time.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <div className={styles.icon}>🏢</div>
                        <h2>Corporate Orders</h2>
                        <p>
                            We provide sweet orders for corporate events,
                            celebrations, employee occasions, and business
                            requirements.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <div className={styles.icon}>🎁</div>
                        <h2>Custom Sweet Boxes</h2>
                        <p>
                            Create sweet boxes for special occasions, functions,
                            gifting, and corporate requirements based on your
                            needs.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <div className={styles.icon}>🍽️</div>
                        <h2>Arusuvai Catering</h2>
                        <p>
                            Established in 2019, Arusuvai Catering provides
                            catering services along with traditional food and
                            sweets for various occasions.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <div className={styles.icon}>🏪</div>
                        <h2>Direct Purchase</h2>
                        <p>
                            Customers can also purchase sweets directly from
                            our catering location in Tiruppur.
                        </p>
                    </article>

                </div>

                <div className={styles.cta}>

                    <h2>Have a Special Requirement?</h2>

                    <p>
                        For bulk orders, custom sweet boxes, wedding,
                        function, or corporate requirements, get in touch
                        with us to discuss your needs.
                    </p>

                    <a href="/contact" className={styles.button}>
                        Contact Us
                    </a>

                </div>

            </div>

        </section>
    );
}

export default Services;