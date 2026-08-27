import styles from "./HeroBanner.module.css";
import SweetBox from "../../../assets/SweetBox.webp";
import MobileHero from "../../../assets/gallery/mobile_layout.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBagShopping,
    faLeaf,
    faSpa,
    faAward,
} from "@fortawesome/free-solid-svg-icons";

function HeroBanner() {

    const scrollToProducts = () => {
        const section = document.getElementById("products");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <section className={styles.hero}>

            {/* ==================================================
                MOBILE HERO BACKGROUND
                Only visible on mobile
               ================================================== */}

            <div className={styles.mobileHeroImage}>
                <img
                    src={MobileHero}
                    alt=""
                />
            </div>


            {/* ==================================================
                HERO CONTENT
               ================================================== */}

            <div className={styles.container}>

                <div className={styles.content}>

                    {/* ==================================================
                        DESKTOP EYEBROW
                       ================================================== */}

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


                    {/* ==================================================
                        DESKTOP BRAND
                       ================================================== */}

                    <h1>

                        <span className={styles.primary}>
                            ARUSUVAI
                        </span>

                        <span className={styles.secondary}>
                            SWEETS
                        </span>

                    </h1>


                    {/* ==================================================
                        DIVIDER
                       ================================================== */}

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


                    {/* ==================================================
                        MAIN HEADING
                       ================================================== */}

                    <h2>

                        A Sweet Tradition,
                        <br />

                        <span>
                            Made With Care.
                        </span>

                    </h2>


                    {/* ==================================================
                        DESCRIPTION
                       ================================================== */}

                    <p>

                        Handcrafted with premium ingredients,
                        pure ghee, and timeless recipes.

                    </p>


                    {/* ==================================================
                        SHOP BUTTON
                       ================================================== */}

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


                    {/* ==================================================
                        FEATURES
                       ================================================== */}

                    <div className={styles.features}>

                        {/* PURE GHEE */}

                        <div className={styles.feature}>

                            <FontAwesomeIcon
                                icon={faSpa}
                                className={styles.featureIcon}
                            />

                            <span>
                                Pure Ghee
                            </span>

                        </div>


                        {/* DIVIDER */}

                        <div className={styles.featureDivider}></div>


                        {/* PREMIUM QUALITY */}

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


                        {/* DIVIDER */}

                        <div className={styles.featureDivider}></div>


                        {/* TRADITIONAL RECIPES */}

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


                {/* ==================================================
                    DESKTOP SWEET BOX
                    Hidden on mobile
                   ================================================== */}

                <div className={styles.imageContainer}>

                    <img
                        src={SweetBox}
                        alt="Arusuvai Sweets"
                        className={styles.image}
                    />

                </div>

            </div>

        </section>
    );
}

export default HeroBanner;