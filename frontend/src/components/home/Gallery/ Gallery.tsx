import { useEffect, useState } from "react";

import styles from "./Gallery.module.css";

import galleryImage from "../../../assets/sweetbox.jpg";

const images = [
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
    galleryImage,
];

const IMAGES_PER_PAGE = 8;

function Gallery() {

    const [imagesPerPage, setImagesPerPage] = useState(
        window.innerWidth <= 768 ? 2 : 8
    );

    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(
        images.length / imagesPerPage
    );
    
    const startIndex =
        currentPage * imagesPerPage;
    
    const visibleImages = images.slice(
        startIndex,
        startIndex + imagesPerPage
    );

     
    useEffect(() => {
    
        const handleResize = () => {
    
            setImagesPerPage(
                window.innerWidth <= 768 ? 2 : 8
            );
    
            setCurrentPage(0);
    
        };
    
        window.addEventListener(
            "resize",
            handleResize
        );
    
        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    
    }, []);

    const goToPrevious = () => {

        setCurrentPage((page) =>
            page === 0
                ? totalPages - 1
                : page - 1
        );

    };

    const goToNext = () => {

        setCurrentPage((page) =>
            page === totalPages - 1
                ? 0
                : page + 1
        );

    };

    return (

        <section className={styles.section}>

            <div className={styles.header}>

                <h2>
                    A Glimpse of Arusuvai
                </h2>

                <p>
                    From traditional preparation to careful
                    packing, every sweet is made with care.
                </p>

            </div>

            <div className={styles.galleryContainer}>

                <div className={styles.grid}>

                    {visibleImages.map((image, index) => (

                        <div
                            key={`${currentPage}-${index}`}
                            className={styles.imageWrapper}
                        >

                            <img
                                src={image}
                                alt={`Arusuvai Sweets gallery ${
                                    startIndex + index + 1
                                }`}
                                className={styles.image}
                            />

                        </div>

                    ))}

                </div>

                {totalPages > 1 && (

                    <div className={styles.navigation}>

                        <button
                            type="button"
                            className={styles.arrow}
                            onClick={goToPrevious}
                            aria-label="Previous gallery images"
                        >
                            ←
                        </button>

                        <div className={styles.dots}>

                            {Array.from(
                                { length: totalPages }
                            ).map((_, index) => (

                                <button
                                    key={index}
                                    type="button"
                                    className={`${styles.dot} ${
                                        currentPage === index
                                            ? styles.activeDot
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setCurrentPage(index)
                                    }
                                    aria-label={`Go to gallery page ${
                                        index + 1
                                    }`}
                                />

                            ))}

                        </div>

                        <button
                            type="button"
                            className={styles.arrow}
                            onClick={goToNext}
                            aria-label="Next gallery images"
                        >
                            →
                        </button>

                    </div>

                )}

            </div>

        </section>

    );
}

export default Gallery;