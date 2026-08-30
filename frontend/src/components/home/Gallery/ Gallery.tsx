import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import api from "../../../services/api";
import headingLeft from "../../../assets/headingLeft.webp";
import headingRight from "../../../assets/headingRight.webp";

interface S3GalleryImage {
    key: string;
    url: string;
}

const IMAGES_PER_PAGE_DESKTOP = 8;
const IMAGES_PER_PAGE_MOBILE = 4;

function Gallery() {
    const [images, setImages] = useState<S3GalleryImage[]>([]);
    const [imagesPerPage, setImagesPerPage] = useState(
        window.innerWidth <= 768 ? IMAGES_PER_PAGE_MOBILE : IMAGES_PER_PAGE_DESKTOP
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const response = await api.get<S3GalleryImage[]>("/api/images/gallery");
                setImages(response.data);
            } catch (error) {
                console.error("Failed to load gallery images:", error);
            } finally {
                setLoading(false);
            }
        };
        loadImages();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setImagesPerPage(
                window.innerWidth <= 768
                    ? IMAGES_PER_PAGE_MOBILE
                    : IMAGES_PER_PAGE_DESKTOP
            );
            setCurrentPage(0);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(images.length / imagesPerPage);
    const startIndex = currentPage * imagesPerPage;
    const visibleImages = images.slice(startIndex, startIndex + imagesPerPage);

    const goToPrevious = () => {
        setCurrentPage(page => page === 0 ? totalPages - 1 : page - 1);
    };

    const goToNext = () => {
        setCurrentPage(page => page === totalPages - 1 ? 0 : page + 1);
    };

    if (loading || images.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <img src={headingLeft} alt="" className={styles.headingImage} />
                <div className={styles.headingContent}>
                    <h2>A Glimpse of Arusuvai</h2>
                    <p>
                        From traditional preparation to careful packing,
                        every sweet is made with care.
                    </p>
                </div>
                <img src={headingRight} alt="" className={styles.headingImage} />
            </div>

            <div className={styles.galleryContainer}>
                <div className={styles.grid}>
                    {visibleImages.map((image, index) => (
                        <div key={image.key} className={styles.imageWrapper}>
                            <img
                                src={image.url}
                                alt={`Arusuvai Sweets gallery ${startIndex + index + 1}`}
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
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`${styles.dot} ${
                                        currentPage === index ? styles.activeDot : ""
                                    }`}
                                    onClick={() => setCurrentPage(index)}
                                    aria-label={`Go to gallery page ${index + 1}`}
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