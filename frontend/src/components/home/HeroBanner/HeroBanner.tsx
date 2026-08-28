import styles from "./HeroBanner.module.css";
import MobileHero from "../../../assets/herobanner/mobile_layout.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBagShopping,
    faLeaf,
    faSpa,
    faAward
} from "@fortawesome/free-solid-svg-icons";

function HeroBanner() {

    const scrollToProducts = () => {
        document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={styles.hero}>

            {/* Mobile hero image */}
            <div className={styles.mobileHeroImage}>
                <img
                    src={MobileHero}
                    alt=""
                />
            </div>

            <div className={styles.container}>

                <div className={styles.content}>

                    <div className={styles.eyebrow}>

                        <FontAwesomeIcon
                            icon={faLeaf}
                            flip="horizontal"
                            size="xl"
                            style={{ color: "#fdcb13" }}
                        />

                        PURE • PREMIUM • TRADITIONAL

                        <FontAwesomeIcon
                            icon={faLeaf}
                            size="xl"
                            style={{ color: "#fdcb13" }}
                        />

                    </div>

                    <h1>
                        <span className={styles.primary}>
                            ARUSUVAI
                        </span>

                        <span className={styles.secondary}>
                            SWEETS
                        </span>
                    </h1>

                    <h2>
                        A Sweet Tradition,
                        <br />

                        <span>
                            Made With Care.
                        </span>
                    </h2>

                    <div className={styles.divider}>

                        <span></span>

                        <span className={styles.dividerIcon}>

                            <FontAwesomeIcon
                                icon={faSpa}
                                size="2xl"
                                style={{ color: "#fdcb13" }}
                            />

                        </span>

                        <span></span>

                    </div>

                    <p>
                        Handcrafted with premium ingredients,
                        pure ghee, and timeless recipes.
                    </p>

                    <button
                        onClick={scrollToProducts}
                        className={styles.button}
                    >

                        <FontAwesomeIcon
                            icon={faBagShopping}
                            style={{ color: "#072119" }}
                        />

                        <span className={styles.buttonText}>
                            Shop Now
                        </span>

                        <span className={styles.arrow}>
                            →
                        </span>

                    </button>

                    <div className={styles.features}>

                        <div className={styles.feature}>

                            <FontAwesomeIcon
                                icon={faSpa}
                                className={styles.featureIcon}
                            />

                            <span>
                                Pure Ghee
                            </span>

                        </div>

                        <div className={styles.featureDivider}></div>

                        <div className={styles.feature}>

                            <FontAwesomeIcon
                                icon={faAward}
                                className={styles.featureIcon}
                            />

                            <span>
                                Premium
                                <br />
                                Quality
                            </span>

                        </div>

                        <div className={styles.featureDivider}></div>

                        <div className={styles.feature}>

                            <FontAwesomeIcon
                                icon={faLeaf}
                                className={styles.featureIcon}
                            />

                            <span>
                                Traditional
                                <br />
                                Recipes
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default HeroBanner;