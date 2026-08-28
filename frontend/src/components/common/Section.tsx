
import headingLeft from "../../assets/headingLeft.webp";
import headingRight from "../../assets/headingRight.webp";
import styles from "../product/SweetTypeChoice/SweetTypeChoice.module.css";

interface SectionProps {

    title: string;

    subtitle?: string;

    children: React.ReactNode;

}

function Section({

    title,

    subtitle,

    children,

}: SectionProps) {

    return (

        <section className="section">

            <div className={styles.heading}>
                <img src={headingLeft} alt="" className={styles.headingImage} />
                <div>
                    <h2> {title} </h2>
                   {subtitle && ( <p>{subtitle}</p> )}
                </div>
                <img src={headingRight} alt="" className={styles.headingImage} />
            </div>
            {children}
        </section>
    );
}

export default Section;