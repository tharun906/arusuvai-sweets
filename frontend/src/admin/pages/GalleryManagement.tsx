import { useEffect, useState } from "react";
import { galleryService, type S3GalleryImage } from "../services/galleryService";
import "../styles/AdminGalleryManagement.css";
import Loading from "../../components/common/Loading";

function GalleryManagement() {
    const [images, setImages] = useState<S3GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const loadImages = async () => {
        try {
            setLoading(true); setError("");
            setImages(await galleryService.getImages());
        } catch (error) {
            console.error("Failed to load gallery images:", error);
            setError("Unable to load gallery images.");
        } finally { setLoading(false); }
    };

    useEffect(() => { loadImages(); }, []);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image."); event.target.value = ""; return;
        }
        if (file.size > 15 * 1024 * 1024) {
            setError("Image size must be less than 15 MB."); event.target.value = ""; return;
        }
        try {
            setUploading(true); setError("");
            await galleryService.uploadImage(file);
            await loadImages();
        } catch (error) {
            console.error("Gallery image upload failed:", error);
            setError("Unable to upload gallery image.");
        } finally {
            setUploading(false); event.target.value = "";
        }
    };

    const handleDelete = async (image: S3GalleryImage) => {
        if (!window.confirm("Delete this gallery image?")) return;
        try {
            setError("");
            await galleryService.deleteImage(image.key);
            setImages(previous => previous.filter(current => current.key !== image.key));
        } catch (error) {
            console.error("Gallery image delete failed:", error);
            setError("Unable to delete gallery image.");
        }
    };

    if (loading) return <Loading />;

    return (
        <section className="gallery-management">
            <div className="gallery-management-header">
                <h1 className="gallery-management-title">Gallery Management</h1>
                <p className="gallery-management-description">Manage the images displayed in the Arusuvai gallery.</p>
            </div>

            <div className="gallery-upload-section">
                <label className="gallery-upload-label">
                    {uploading ? "Uploading..." : " + Upload Gallery Image"}
                    <input className="gallery-upload-input" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            {error && <p className="gallery-error">{error}</p>}

            {images.length === 0 ? (
                <div className="gallery-empty"><p>No gallery images found.</p></div>
            ) : (
                <div className="gallery-image-grid">
                    {images.map(image => (
                        <div key={image.key} className="gallery-image-card">
                            <div className="gallery-image-wrapper">
                                <img src={image.url} alt="Arusuvai Gallery" className="gallery-image" />
                            </div>
                            <button type="button" className="gallery-delete-btn" onClick={() => handleDelete(image)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default GalleryManagement;