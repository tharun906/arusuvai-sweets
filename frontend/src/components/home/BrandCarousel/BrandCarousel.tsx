import { useEffect, useState } from "react";

import styles from "./BrandCarousel.module.css";

import sweetboxImage from "../../../assets/brand/event-catering-services-916.jpg";

const slides = [
    {
        image: sweetboxImage,
        title: "Traditional Sweet Making",
        description:
            "Authentic sweets prepared with traditional recipes and care.",
    },
    {
        image: sweetboxImage,
        title: "Made With Care",
        description:
            "Every sweet is carefully prepared using quality ingredients.",
    },
    {
        image: sweetboxImage,
        title: "Made For Every Occasion",
        description:
            "From everyday treats to celebrations and special events.",
    },
];

function BrandCarousel() {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentSlide((current) =>
                current === slides.length - 1
                    ? 0
                    : current + 1
            );

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    const goToPrevious = () => {

        setCurrentSlide((current) =>
            current === 0
                ? slides.length - 1
                : current - 1
        );

    };

    const goToNext = () => {

        setCurrentSlide((current) =>
            current === slides.length - 1
                ? 0
                : current + 1
        );

    };

    const slide = slides[currentSlide];

    return (

        <section className={styles.section}>

            <div className={styles.carousel}>

                <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.image}
                />

                <div className={styles.overlay}>

                    <h2>
                        {slide.title}
                    </h2>

                    <p>
                        {slide.description}
                    </p>

                </div>

                <button
                    type="button"
                    className={`${styles.arrow} ${styles.previous}`}
                    onClick={goToPrevious}
                    aria-label="Previous slide"
                >
                    ←
                </button>

                <button
                    type="button"
                    className={`${styles.arrow} ${styles.next}`}
                    onClick={goToNext}
                    aria-label="Next slide"
                >
                    →
                </button>

            </div>

            <div className={styles.dots}>

                {slides.map((_, index) => (

                    <button
                        key={index}
                        type="button"
                        className={`${styles.dot} ${
                            currentSlide === index
                                ? styles.activeDot
                                : ""
                        }`}
                        onClick={() =>
                            setCurrentSlide(index)
                        }
                        aria-label={`Go to slide ${index + 1}`}
                    />

                ))}

            </div>

        </section>

    );
}

export default BrandCarousel;