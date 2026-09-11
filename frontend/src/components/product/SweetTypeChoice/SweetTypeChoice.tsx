import styles from "./SweetTypeChoice.module.css";

import sweetBoxImage from "../../../assets/SweetChoice.jpeg";
import customizeImage from "../../../assets/SweetChoice.jpeg";
import headingLeft from "../../../assets/headingLeft.webp";
import headingRight from "../../../assets/headingRight.webp";
import leftBoxBadge from "../../../assets/leftBoxBadge.webp";
import rightBoxBadge from "../../../assets/rightBoxBadge.webp";

import { useComboPack } from "../../../hooks/useComboPack";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

function SweetTypeChoice() {

    const navigate = useNavigate();

    const { comboPacks, loading: comboLoading } =
        useComboPack();

    const { addToCart } = useCart();

    const comboPack = comboPacks[0];

    const scrollTo = (id: string) =>
        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    const handleAddComboToCart = () => {

        if (!comboPack || !comboPack.active) {
            return;
        }

        addToCart({
            itemType: "COMBO_PACK",
            comboPackId: comboPack.id,
            quantity: 1
        });

    };

    return (

        <section className={styles.section}>

            {/* ========================================
                SECTION HEADING
            ======================================== */}

            <div className={styles.heading}>

                <img
                    src={headingLeft}
                    alt=""
                    className={styles.headingImage}
                />

                <div>

                    <h2>
                        Pick Your Sweet
                    </h2>

                    <p>
                        Choose your perfect box or create your own
                    </p>

                </div>

                <img
                    src={headingRight}
                    alt=""
                    className={styles.headingImage}
                />

            </div>


            {/* ========================================
                EXISTING TWO OPTIONS
            ======================================== */}

            <div className={styles.cards}>

                {/* OUR SWEET BOXES */}

                <div
                    className={`${styles.card} ${styles.defaultCard}`}
                >

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
                            Ready-made combinations Sweet Box, by Arusuvai.
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
                            <span>→</span>
                        </button>

                    </div>

                </div>


                {/* BUILD YOUR OWN BOX */}

                <div
                    className={`${styles.card} ${styles.customizeCard}`}
                >

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
                            Choose your favourite sweets and create your own combination.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                scrollTo("products")
                            }
                        >
                            Customize Now
                            <span>→</span>
                        </button>

                    </div>

                </div>

            </div>


            {/* ========================================
                COMBO PACK
            ======================================== */}

            {!comboLoading && comboPack && (

                <div className={styles.comboCard}>

                    <div className={styles.comboImageWrapper}>

                        <img
                            src={comboPack.imageUrl}
                            alt={comboPack.title}
                            className={styles.comboImage}
                        />

                        <span className={styles.comboBadge}>
                            SPECIAL COMBO
                        </span>

                    </div>

                    <div className={styles.comboInfo}>

                        <div className={styles.comboText}>

                            <span className={styles.comboEyebrow}>
                                ARUSUVAI'S PICK
                            </span>

                            <h3>
                                {comboPack.title}
                            </h3>

                            <p className={styles.comboDescription}>
                                {comboPack.contents}
                            </p>

                            <div className={styles.comboDetails}>

                                <div className={styles.comboDetail}>
                                    <span className={styles.detailLabel}>
                                        Weight
                                    </span>

                                    <strong>
                                        {comboPack.weight}
                                    </strong>
                                </div>

                                <div className={styles.comboDivider} />

                                <div className={styles.comboDetail}>
                                    <span className={styles.detailLabel}>
                                        Price
                                    </span>

                                    <strong className={styles.comboPrice}>
                                        ₹{comboPack.price}
                                    </strong>
                                </div>

                            </div>

                        </div>

                        <button
                            type="button"
                            className={styles.comboButton}
                            disabled={!comboPack.active}
                            onClick={handleAddComboToCart}
                        >

                            <span>
                                {comboPack.active
                                    ? "Add to Cart"
                                    : "Currently Unavailable"
                                }
                            </span>

                            {comboPack.active && (
                                <span className={styles.buttonArrow}>
                                    →
                                </span>
                            )}

                        </button>

                    </div>

                </div>

            )}


            {/* ========================================
                BULK ORDERS
            ======================================== */}

            <div
                className={styles.bulkCard}
                role="button"
                tabIndex={0}
                onClick={() =>
                    navigate("/contact")
                }
                onKeyDown={(event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        navigate("/contact");

                    }

                }}
            >

                <div className={styles.bulkIcon}>
                    ✦
                </div>

                <div className={styles.bulkInfo}>

                    <span className={styles.bulkEyebrow}>
                        FOR SPECIAL OCCASIONS
                    </span>

                    <h3>
                        Bulk Orders
                    </h3>

                    <p>
                        Weddings · Functions · Corporate
                    </p>

                    <small>
                        Custom quantities for your special events
                    </small>

                </div>

                <button
                    type="button"
                    className={styles.bulkButton}
                    onClick={(event) => {

                        event.stopPropagation();

                        navigate("/contact");

                    }}
                >

                    Contact Us

                    <span>
                        →
                    </span>

                </button>

            </div>

        </section>

    );
}

export default SweetTypeChoice;