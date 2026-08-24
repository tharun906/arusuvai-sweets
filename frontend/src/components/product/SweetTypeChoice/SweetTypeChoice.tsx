import styles from "./SweetTypeChoice.module.css";

import sweetBoxImage from "../../../assets/sweetbox.jpg";
import customizeImage from "../../../assets/sweetbox.jpg";

import headingLeft from "../../../assets/headingLeft.webp";
import headingRight from "../../../assets/headingRight.webp";

import leftBoxBadge from "../../../assets/leftBoxBadge.webp";
import rightBoxBadge from "../../../assets/rightBoxBadge.webp";


function SweetTypeChoice() {

    const scrollTo = (id: string) =>
        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });


    return (

        <section className={styles.section}>

            {/* =========================
                HEADING
            ========================= */}

            <div className={styles.heading}>

                <img
                    src={headingLeft}
                    alt=""
                    className={styles.headingImage}
                />

                <h2>
                    How would you like your sweets?
                </h2>

                <img
                    src={headingRight}
                    alt=""
                    className={styles.headingImage}
                />

            </div>


            {/* =========================
                CHOICE CARDS
            ========================= */}

            <div className={styles.cards}>

                {/* =========================
                    DEFAULT SWEET BOX
                ========================= */}

                <div
                    className={`${styles.card} ${styles.defaultCard}`}
                >

                    {/* Round badge */}

                    <img
                        src={leftBoxBadge}
                        alt=""
                        className={styles.boxBadge}
                    />


                    <div className={styles.imageContainer}>

                        <img
                            src={sweetBoxImage}
                            alt="Our Sweet Boxes"
                        />

                    </div>


                    <div className={styles.content}>

                        <h3>
                            Our Sweet Boxes
                        </h3>

                        <p>
                            Ready-made combinations Sweet Box,
                             by Arusuvai.
                        </p>


                        <div className={styles.weights}>

                            <span>Small</span>

                            <span>Medium</span>

                            <span>Large</span>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                scrollTo("sweet-boxes")
                            }
                        >
                            Explore Boxes

                            <span>
                                →
                            </span>

                        </button>

                    </div>

                </div>


                {/* =========================
                    BUILD YOUR OWN BOX
                ========================= */}

                <div
                    className={`${styles.card} ${styles.customizeCard}`}
                >

                    {/* Round badge */}

                    <img
                        src={rightBoxBadge}
                        alt=""
                        className={styles.boxBadge}
                    />


                    <div className={styles.imageContainer}>

                        <img
                            src={customizeImage}
                            alt="Build Your Own Box"
                        />

                    </div>


                    <div className={styles.content}>

                        <h3>
                            Build Your Own Box
                        </h3>

                        <p>
                            Choose your favourite sweets
                            and create your own combination.
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                scrollTo("products")
                            }
                        >
                            Customize Now

                            <span>
                                →
                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default SweetTypeChoice;