
import styles from "./FestivePromoBanner.module.css";
import diwaliBanner from "../../../assets/herobanner/festival.png";

function FestivePromoBanner() {
    return (
        <section className={styles.banner}>
            <img
                src={diwaliBanner}
                alt="Diwali Special - Arusuvai Sweets Festive Collection"
                className={styles.bannerImage}
            />
        </section>
    );
}

export default FestivePromoBanner;
