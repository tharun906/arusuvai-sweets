import styles from "./SweetTypeChoice.module.css";

import sweetBoxImage from "../../../assets/SweetBoxNobg.png";
import customizeImage from "../../../assets/SweetBox.png";

function SweetTypeChoice() {

    const scrollToSweetBoxes = () => {

        document
            .getElementById("sweet-boxes")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    const scrollToProducts = () => {

        document
            .getElementById("products")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    return (

        <section className={styles.section}>

            <div className={styles.heading}>

                <span>✦</span>

                <h2>
                    How would you like your sweets?
                </h2>

                <span>✦</span>

            </div>

            <div className={styles.cards}>

                {/* DEFAULT SWEET BOX */}

                <div className={styles.card}>

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
                            Ready-made combinations,
                            carefully selected by Arusuvai.
                        </p>

                        <div className={styles.weights}>

                            <span>500g</span>
                            <span>1kg</span>
                            <span>1.5kg</span>

                        </div>

                        <button
                            type="button"
                            onClick={scrollToSweetBoxes}
                        >
                            Explore Boxes
                            <span>→</span>
                        </button>

                    </div>

                </div>


                {/* CUSTOM SWEET BOX */}

                <div className={styles.card}>

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
                            onClick={scrollToProducts}
                        >
                            Customize Now
                            <span>→</span>
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SweetTypeChoice;