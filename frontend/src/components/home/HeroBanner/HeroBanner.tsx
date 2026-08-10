import styles from "./HeroBanner.module.css";
import heartfulnessLogo from "../../../assets/heartfulness.png";
import sweetbxLogo from "../../../assets/sweetbox.jpg";

function HeroBanner() {
    const scrollToProducts = () => {
        const section = document.getElementById("products");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* <img
                        src={heartfulnessLogo}
                        alt="Heartfulness"
                        className={styles.logo}
                    /> */}

                    <h1>
                        <span className={styles.primary}>ARUSUVAI</span>
                        <span className={styles.secondary}>SWEETS</span>
                    </h1>
                    
                    <h2> Traditional Taste, <br /> Made with Love ❤️ </h2>

                    <p>
                        Freshly handcrafted sweets made
                        using premium ingredients,
                        pure ghee and traditional recipes
                        passed through generations.
                    </p>

                    <button onClick={scrollToProducts} className={styles.button}> Shop Now</button>

                </div>

                <div className={styles.imageContainer}>
                    <img src={sweetbxLogo} alt="Arusuvai Sweets" className={styles.image} />
                </div>

            </div>
        </section>
    );
}

export default HeroBanner;