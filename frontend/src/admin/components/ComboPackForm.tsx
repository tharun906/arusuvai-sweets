import { useEffect, useState } from "react";
import axios from "axios";

import type { ComboPackRequest } from "../types/ComboPackRequest";

import { imageService } from "../../services/imageService";

import "../styles/ComboPackForm.css";

interface ComboPackFormProps {

    initialValues: ComboPackRequest;

    buttonText: string;

    loading: boolean;

    onSubmit: (
        request: ComboPackRequest
    ) => Promise<void>;

}

function ComboPackForm({
    initialValues,
    buttonText,
    loading,
    onSubmit
}: ComboPackFormProps) {

    const [form, setForm] =
        useState<ComboPackRequest>(
            initialValues
        );

    const [uploadingImage, setUploadingImage] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        setForm(initialValues);

    }, [initialValues]);

    const handleChange = (
        event:
            React.ChangeEvent<
                HTMLInputElement |
                HTMLTextAreaElement
            >
    ) => {

        const {
            name,
            value
        } = event.target;

        setError("");

        setForm(previous => ({
            ...previous,
            [name]:
                name === "price"
                    ? Number(value)
                    : value
        }));

    };

    const handleImageUpload = async (
        event:
            React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            setError(
                "Please select a valid image file."
            );

            return;
        }

        if (
            file.size >
            15 * 1024 * 1024
        ) {

            setError(
                "Image size must be less than 15 MB."
            );

            return;
        }

        setError("");
        setUploadingImage(true);

        try {

            const imageUrl =
                await imageService.uploadImage(
                    file,
                    "combo-packs",
                    form.title || "combo-pack"
                );

            setForm(previous => ({
                ...previous,
                imageUrl
            }));

        } catch (error) {

            console.error(
                "Combo Pack image upload failed:",
                error
            );

            if (axios.isAxiosError(error)) {

                console.error(
                    "Status:",
                    error.response?.status
                );

                console.error(
                    "Response:",
                    error.response?.data
                );

            }

            setError(
                "Image upload failed. Please try again."
            );

        } finally {

            setUploadingImage(false);

        }

    };

    const handleSubmit = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        setError("");

        if (!form.title.trim()) {

            setError(
                "Combo Pack title is required."
            );

            return;
        }

        if (!form.contents.trim()) {

            setError(
                "Combo Pack contents are required."
            );

            return;
        }

        if (!form.weight.trim()) {

            setError(
                "Combo Pack weight is required."
            );

            return;
        }

        if (form.price <= 0) {

            setError(
                "Price must be greater than zero."
            );

            return;
        }

        if (!form.imageUrl.trim()) {

            setError(
                "Please upload a Combo Pack image."
            );

            return;
        }

        if (uploadingImage) return;

        await onSubmit(form);

    };

    return (

        <form
            className="combo-pack-form"
            onSubmit={handleSubmit}
        >

            <div className="combo-form-field">

                <label htmlFor="combo-title">
                    Title
                </label>

                <input
                    id="combo-title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter Combo Pack title"
                    maxLength={100}
                />

            </div>

            <div className="combo-form-field">

                <label htmlFor="combo-contents">
                    Contents
                </label>

                <textarea
                    id="combo-contents"
                    name="contents"
                    value={form.contents}
                    onChange={handleChange}
                    placeholder="Enter Combo Pack contents"
                    rows={4}
                />

            </div>

            <div className="combo-form-field">

                <label htmlFor="combo-weight">
                    Weight
                </label>

                <input
                    id="combo-weight"
                    name="weight"
                    type="text"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="Example: 750g"
                    maxLength={50}
                />

            </div>

            <div className="combo-form-field">

                <label htmlFor="combo-price">
                    Price (₹)
                </label>

                <input
                    id="combo-price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                />

            </div>

            <div className="combo-form-field">

                <label htmlFor="combo-image">
                    Combo Pack Image
                </label>

                <input
                    id="combo-image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                />

                {uploadingImage && (
                    <p>
                        Uploading image...
                    </p>
                )}

                {form.imageUrl &&
                    !uploadingImage && (

                        <div className="combo-image-preview">

                            <img
                                src={form.imageUrl}
                                alt="Combo Pack preview"
                            />

                            <p>
                                Image uploaded successfully.
                            </p>

                        </div>

                    )}

            </div>

            {error && (

                <p className="combo-form-error">
                    {error}
                </p>

            )}

            <button
                type="submit"
                className="combo-submit-btn"
                disabled={
                    loading ||
                    uploadingImage
                }
            >

                {uploadingImage
                    ? "Uploading Image..."
                    : loading
                        ? "Saving..."
                        : buttonText}

            </button>

        </form>

    );

}

export default ComboPackForm;