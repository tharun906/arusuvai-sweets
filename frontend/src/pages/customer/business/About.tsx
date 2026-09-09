import styles from "./About.module.css";

function About() {
    return (
        <section className={styles.page}>

            <div className={styles.container}>

                <header className={styles.header}>
                    <span className={styles.eyebrow}>
                        ABOUT US
                    </span>

                    <h1>
                        Traditional Taste.
                        <br />
                        Made With Care.
                    </h1>

                    <p>
                        Arusuvai Sweets brings authentic traditional sweets
                        to customers with a focus on taste, quality, and the
                        joy of sharing.
                    </p>
                </header>

                <div className={styles.section}>

                    <div className={styles.content}>
                        <span className={styles.label}>
                            OUR STORY
                        </span>

                        <h2>
                            From Arusuvai Catering to Arusuvai Sweets
                        </h2>

                        <p>
                            Arusuvai Catering was established in 2019 with a
                            passion for preparing traditional food and sweets
                            with care and consistency.
                        </p>

                        <p>
                            In 2022, Arusuvai Sweets was started as a branch
                            of Arusuvai Catering, bringing our traditional
                            sweets to customers through both direct and
                            online orders.
                        </p>

                        <p>
                            Our goal is simple — to provide authentic sweets
                            with no compromise in taste and quality.
                        </p>
                    </div>

                </div>

                <div className={styles.values}>

                    <div className={styles.valueCard}>
                        <span className={styles.icon}>🍬</span>

                        <h3>
                            Traditional Taste
                        </h3>

                        <p>
                            We value the traditional flavours and preparation
                            that make our sweets special.
                        </p>
                    </div>

                    <div className={styles.valueCard}>
                        <span className={styles.icon}>✨</span>

                        <h3>
                            Quality
                        </h3>

                        <p>
                            We focus on maintaining the quality and consistency
                            our customers expect.
                        </p>
                    </div>

                    <div className={styles.valueCard}>
                        <span className={styles.icon}>❤️</span>

                        <h3>
                            Made With Care
                        </h3>

                        <p>
                            Every order represents a celebration, tradition,
                            or special moment worth sharing.
                        </p>
                    </div>

                </div>

                <div className={styles.offerSection}>

                    <div>
                        <span className={styles.label}>
                            WHAT WE OFFER
                        </span>

                        <h2>
                            Sweets for Every Occasion
                        </h2>
                    </div>

                    <div className={styles.offerList}>

                        <span>Traditional Sweets</span>
                        <span>Bulk & Wholesale Orders</span>
                        <span>Wedding & Function Orders</span>
                        <span>Corporate Orders</span>
                        <span>Custom Sweet Boxes</span>
                        <span>Online Orders</span>

                    </div>

                </div>

                <div className={styles.location}>

                    <span className={styles.label}>
                        VISIT US
                    </span>

                    <h2>
                        Arusuvai Catering
                    </h2>

                    <p>
                        19/9 Kumarananthapuram, 7th Street,
                        <br />
                        West Manipal Store Opp,
                        <br />
                        Tiruppur Corporation Ward 22,
                        <br />
                        Tamil Nadu – 641602
                    </p>

                    <div className={styles.contactDetails}>

                        <a href="tel:+919443178984">
                            +91 94431 78984
                        </a>

                        <a href="mailto:support@arusuvaisweets.in">
                            support@arusuvaisweets.in
                        </a>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;