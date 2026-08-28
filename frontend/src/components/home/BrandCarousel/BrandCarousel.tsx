import { useEffect, useState } from "react";
import styles from "./BrandCarousel.module.css";
import api from "../../../services/api";

interface S3ImageResponse {
    key: string;
    url: string;
}

function BrandCarousel() {
    const [images, setImages] = useState<S3ImageResponse[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const response = await api.get<S3ImageResponse[]>("/api/images/carousel");
                setImages(response.data);
            } catch (error) {
                console.error("Failed to load carousel images:", error);
            } finally {
                setLoading(false);
            }
        };
        loadImages();
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(current => current === images.length - 1 ? 0 : current + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    if (loading || images.length === 0) return null;

    const goToPrevious = () =>
        setCurrentSlide(current => current === 0 ? images.length - 1 : current - 1);

    const goToNext = () =>
        setCurrentSlide(current => current === images.length - 1 ? 0 : current + 1);

    const slide = images[currentSlide];

    return (
        <section className={styles.section}>
            <div className={styles.carousel}>
                <img src={slide.url} alt="Arusuvai" className={styles.image} />
                <div className={styles.overlay}>
                    <h2>Traditional Sweet Making</h2>
                    <p>Authentic sweets prepared with traditional recipes, quality ingredients, and care.</p>
                </div>
                <button type="button" className={`${styles.arrow} ${styles.previous}`} onClick={goToPrevious} aria-label="Previous slide">←</button>
                <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={goToNext} aria-label="Next slide">→</button>
            </div>

            <div className={styles.dots}>
                {images.map((image, index) => (
                    <button
                        key={image.key}
                        type="button"
                        className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ""}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default BrandCarousel;