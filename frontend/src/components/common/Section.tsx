import "./Section.css";

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

            <div className="section-header">

                <h2>

                    {title}

                </h2>

                {

                    subtitle && (

                        <p>

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {children}

        </section>

    );

}

export default Section;