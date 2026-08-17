import styles from "./HeroBanner.module.css";
import SweetBox from "../../../assets/FinalSweetBox.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faLeaf, faSpa } from "@fortawesome/free-solid-svg-icons";

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

                    <div className={styles.eyebrow}>
                    <FontAwesomeIcon icon={faLeaf} flip="horizontal" size="xl" style={{color: "#fdcb13",}} />
                        PURE • PREMIUM • TRADITIONAL
                        <FontAwesomeIcon icon={faLeaf} size="xl" style={{color: "#fdcb13",}} />
                    </div>

                    <h1>
                        <span className={styles.primary}>ARUSUVAI</span>
                        <span className={styles.secondary}>SWEETS</span>
                    </h1>

                    <div className={styles.divider}>
                        <span></span>
                        <span className={styles.dividerIcon}><FontAwesomeIcon icon={faSpa} size="2xl" style={{color: "#fdcb13",}} /></span>
                        <span></span>
                    </div>

                    <h2>
                        A Sweet Tradition,
                        <br />
                        <span>Made With Care.</span>
                    </h2>

                    <p>
                        Handcrafted with premium ingredients,
                        pure ghee, and timeless recipes.
                    </p>

                    <button
                        onClick={scrollToProducts}
                        className={styles.button}
                    >
                       <FontAwesomeIcon icon={faBagShopping} style={{color: "#072119",}} />
                        Shop Now <span>→</span>
                    </button>

                    <div className={styles.features}>

                        <div className={styles.feature}>
                            <span className={styles.featureIcon}></span>
                            <span>Pure Ghee</span>
                        </div>

                        <div className={styles.featureDivider}></div>

                        <div className={styles.feature}>
                            <span className={styles.featureIcon}></span>
                            <span>Premium Quality</span>
                        </div>

                        <div className={styles.featureDivider}></div>

                        <div className={styles.feature}>
                            <span className={styles.featureIcon}></span>
                            <span>Traditional Recipes</span>
                        </div>

                    </div>

                    </div>

                <div className={styles.imageContainer}>
                    <img src={SweetBox} alt="Arusuvai Sweets" className={styles.image} />
                </div>

            </div>
        </section>
    );
}

export default HeroBanner;