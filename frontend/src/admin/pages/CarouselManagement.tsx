import { useEffect, useState } from "react";
import { carouselService, type S3ImageResponse } from "../../services/carouselService";
import "../styles/AdminCarouselManagement.css";
import Loading from "../../components/common/Loading";

function CarouselManagement() {
    const [images, setImages] = useState<S3ImageResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const loadImages = async () => {
        try {
            setLoading(true); setError("");
            setImages(await carouselService.getImages());
        } catch (error) {
            console.error("Failed to load carousel images:", error);
            setError("Unable to load carousel images.");
        } finally { setLoading(false); }
    };

    useEffect(() => { loadImages(); }, []);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image."); event.target.value = ""; return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5 MB."); event.target.value = ""; return;
        }
        try {
            setUploading(true); setError("");
            await carouselService.uploadImage(file);
            await loadImages();
        } catch (error) {
            console.error("Carousel image upload failed:", error);
            setError("Unable to upload carousel image.");
        } finally {
            setUploading(false); event.target.value = "";
        }
    };

    const handleDelete = async (image: S3ImageResponse) => {
        if (!window.confirm("Delete this carousel image?")) return;
        try {
            setError("");
            await carouselService.deleteImage(image.key);
            setImages(previous => previous.filter(current => current.key !== image.key));
        } catch (error) {
            console.error("Carousel image delete failed:", error);
            setError("Unable to delete carousel image.");
        }
    };

    if (loading) return <Loading />;
    
    return (
        <section className="carousel-management">
            <div className="carousel-management-header">
                <div>
                    <h1 className="carousel-management-title">Brand Carousel</h1>
                    <p className="carousel-management-description">Manage the images displayed in the home page carousel.</p>
                </div>
            </div>

            <div className="carousel-upload-section">
                <label className="carousel-upload-label">
                    {uploading ? "Uploading..." : "+ Upload Carousel Image"}
                    <input className="carousel-upload-input" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            {error && <p className="carousel-error">{error}</p>}

            {images.length === 0 ? (
                <div className="carousel-empty"><p>No carousel images found.</p></div>
            ) : (
                <div className="carousel-image-grid">
                    {images.map(image => (
                        <div key={image.key} className="carousel-image-card">
                            <div className="carousel-image-wrapper">
                                <img src={image.url} alt="Carousel" className="carousel-image" />
                            </div>
                            <button type="button" className="carousel-delete-btn" onClick={() => handleDelete(image)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CarouselManagement;