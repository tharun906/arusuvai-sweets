import "./Section.css";
import headingLeft from "../../assets/headingLeft.webp";
import headingRight from "../../assets/headingRight.webp";

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

            <div className="section-heading">

                <img
                    src={headingLeft}
                    alt=""
                    className="section-heading-image"
                />

                <div>

                    <h2>
                        {title}
                    </h2>

                    {subtitle && (
                        <p>
                            {subtitle}
                        </p>
                    )}

                </div>

                <img
                    src={headingRight}
                    alt=""
                    className="section-heading-image"
                />

            </div>

            {children}

        </section>

    );

}

export default Section;