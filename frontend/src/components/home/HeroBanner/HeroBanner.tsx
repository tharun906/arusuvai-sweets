import styles from "./HeroBanner.module.css";
import HeroVideo from "../../../assets/herobanner/arusuvai_edit.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBagShopping,
    faLeaf,
} from "@fortawesome/free-solid-svg-icons";

function HeroBanner() {

    const scrollToProducts = () => {
        document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={styles.hero}>

            {/* Mobile hero video */}
            <div className={styles.mobileHeroVideo}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src={HeroVideo}
                        type="video/mp4"
                    />
                </video>
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
                            <span>
                                Pure Ghee
                            </span>
                        </div>

                        <div className={styles.featureDivider}></div>

                        <div className={styles.feature}>
                            <span>
                                Premium
                                <br />
                                Quality
                            </span>
                        </div>

                        <div className={styles.featureDivider}></div>

                        <div className={styles.feature}>
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