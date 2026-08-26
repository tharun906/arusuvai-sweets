import { useEffect, useState } from "react";

import styles from "./BrandCarousel.module.css";

import api from "../../../services/api";

interface S3ImageResponse {
    /*
     * S3 object key.
     *
     * Example:
     * carousel/abc123-image.jpg
     */
    key: string;

    /*
     * Public S3 URL used by the browser
     * to display the image.
     */
    url: string;
}

function BrandCarousel() {

    const [images, setImages] =
        useState<S3ImageResponse[]>([]);

    const [currentSlide, setCurrentSlide] =
        useState(0);

    const [loading, setLoading] =
        useState(true);


    /*
     * Load carousel images from S3
     * through our Spring Boot API.
     */
    useEffect(() => {

        const loadImages = async () => {

            try {

                const response =
                    await api.get<S3ImageResponse[]>(
                        "/api/images/carousel"
                    );

                setImages(response.data);

            } catch (error) {

                console.error(
                    "Failed to load carousel images:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };


        loadImages();

    }, []);


    /*
     * Automatically move to the next slide.
     */
    useEffect(() => {

        if (images.length <= 1) {
            return;
        }

        const interval =
            setInterval(() => {

                setCurrentSlide(current =>
                    current === images.length - 1
                        ? 0
                        : current + 1
                );

            }, 3000);


        return () =>
            clearInterval(interval);

    }, [images.length]);


    /*
     * If S3 images are still loading.
     */
    if (loading) {
        return null;
    }


    /*
     * If there are no carousel images
     * in the S3 carousel/ folder.
     */
    if (images.length === 0) {
        return null;
    }


    const goToPrevious = () => {

        setCurrentSlide(current =>
            current === 0
                ? images.length - 1
                : current - 1
        );
    };


    const goToNext = () => {

        setCurrentSlide(current =>
            current === images.length - 1
                ? 0
                : current + 1
        );
    };


    const slide =
        images[currentSlide];


    return (

        <section className={styles.section}>

            <div className={styles.carousel}>

                <img
                    src={slide.url}
                    alt="Arusuvai"
                    className={styles.image}
                />


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

                {images.map((image, index) => (

                    <button
                        key={image.key}
                        type="button"
                        className={`${styles.dot} ${
                            currentSlide === index
                                ? styles.activeDot
                                : ""
                        }`}
                        onClick={() =>
                            setCurrentSlide(index)
                        }
                        aria-label={
                            `Go to slide ${index + 1}`
                        }
                    />

                ))}

            </div>

        </section>
    );
}

export default BrandCarousel;