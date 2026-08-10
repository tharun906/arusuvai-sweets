import Card from "../../common/Card";

import styles from "./FeatureHighlights.module.css";


//  WE REMOVED THIS FEATURE
//  WE REMOVED THIS FEATURE
//  WE REMOVED THIS FEATURE
//  WE REMOVED THIS FEATURE



const features = [

    {
        icon: "🥛",
        title: "Pure Ghee",
        description: "Made using premium quality pure ghee."
    },

    {
        icon: "🍬",
        title: "Handcrafted",
        description: "Traditional recipes prepared with care."
    },

    {
        icon: "🚚",
        title: "Fresh Delivery",
        description: "Freshly packed and delivered quickly."
    },

    {
        icon: "🏆",
        title: "Premium Quality",
        description: "Finest ingredients with authentic taste."
    }

];

function FeatureHighlights() {

    return (

        <section className={styles.section}>

            <h2 className={styles.title}>

                Why Choose Arusuvai?

            </h2>

            <div className={styles.grid}>

                {

                    features.map((feature) => (

                        <Card key={feature.title}>

                            <div className={styles.card}>

                                <div className={styles.icon}>

                                    {feature.icon}

                                </div>

                                <h3>

                                    {feature.title}

                                </h3>

                                <p>

                                    {feature.description}

                                </p>

                            </div>

                        </Card>

                    ))

                }

            </div>

        </section>

    );

}

export default FeatureHighlights;