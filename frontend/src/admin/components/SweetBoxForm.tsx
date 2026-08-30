import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/Product";
import type { SweetBoxRequest } from "../types/SweetBoxRequest";
import { imageService } from "../../services/imageService";
import "../styles/SweetBoxForm.css";

interface SweetBoxFormProps {
    initialValues: SweetBoxRequest;
    buttonText: string;
    loading: boolean;
    onSubmit: (request: SweetBoxRequest) => Promise<void>;
}

function SweetBoxForm({
    initialValues,
    buttonText,
    loading,
    onSubmit
}: SweetBoxFormProps) {

    const { products, loading: productsLoading } = useProducts();

    const [form, setForm] =
        useState<SweetBoxRequest>(initialValues);

    const [selectedProductId, setSelectedProductId] =
        useState(0);

    const [quantity, setQuantity] =
        useState(1);

    const [error, setError] =
        useState("");

    /*
     * Keeps track of whether the selected image
     * is currently being uploaded to AWS S3.
     */
    const [uploadingImage, setUploadingImage] =
        useState(false);


    useEffect(() => {

        setForm(initialValues);

    }, [initialValues]);


    /*
     * ========================================
     * NORMAL FORM CHANGES
     * ========================================
     */
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement
        >
    ) => {

        const { name, value } =
            event.target;

        setForm(previous => ({
            ...previous,

            [name]:
                name === "price"
                    ? Number(value)
                    : name === "active"
                        ? value === "true"
                        : value
        }));

        setError("");
    };


    /*
     * ========================================
     * IMAGE UPLOAD
     * ========================================
     *
     * Admin selects an image
     *
     * React
     *    ↓
     * imageService
     *    ↓
     * Spring Boot
     *    ↓
     * AWS S3
     *    ↓
     * S3 image URL
     *    ↓
     * form.imageUrl
     */
    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }


        /*
         * Make sure the selected file
         * is actually an image.
         */
        if (!file.type.startsWith("image/")) {

            setError(
                "Please select a valid image file."
            );

            return;
        }


        /*
         * Limit image size to 5 MB.
         */
        if (file.size > 5 * 1024 * 1024) {

            setError(
                "Image size must be less than 5 MB."
            );

            return;
        }


        setError("");
        setUploadingImage(true);


        try {


          /*
            * Sweet box images are stored inside
            * the sweet-boxes/ prefix in S3.
            */
            const imageUrl =
            await imageService.uploadImage(
                file,
                "sweet-boxes"
            );


            /*
             * Save the returned S3 URL
             * inside the SweetBoxRequest.
             */
            setForm(previous => ({
                ...previous,
                imageUrl
            }));


        } catch (error) {

            console.error(
                "Sweet box image upload failed:",
                error
            );

            setError(
                "Image upload failed. Please try again."
            );


        } finally {

            setUploadingImage(false);
        }
    };


    /*
     * ========================================
     * ADD SWEET
     * ========================================
     */
    const addSweet = () => {

        if (selectedProductId === 0) {

            return setError(
                "Please select a sweet."
            );
        }


        if (quantity < 1) {

            return setError(
                "Quantity must be at least 1."
            );
        }


        if (
            form.items.some(
                item =>
                    item.productId ===
                    selectedProductId
            )
        ) {

            return setError(
                "This sweet is already added."
            );
        }


        setForm(previous => ({
            ...previous,

            items: [
                ...previous.items,
                {
                    productId: selectedProductId,
                    quantity
                }
            ]
        }));


        setSelectedProductId(0);
        setQuantity(1);
        setError("");
    };


    /*
     * ========================================
     * UPDATE SWEET QUANTITY
     * ========================================
     */
    const updateQuantity = (
        productId: number,
        newQuantity: number
    ) => {

        if (newQuantity < 1) {
            return;
        }


        setForm(previous => ({
            ...previous,

            items:
                previous.items.map(item =>
                    item.productId === productId
                        ? {
                            ...item,
                            quantity: newQuantity
                        }
                        : item
                )
        }));
    };


    /*
     * ========================================
     * REMOVE SWEET
     * ========================================
     */
    const removeSweet = (
        productId: number
    ) => {

        setForm(previous => ({
            ...previous,

            items:
                previous.items.filter(
                    item =>
                        item.productId !==
                        productId
                )
        }));
    };


    /*
     * ========================================
     * GET PRODUCT NAME
     * ========================================
     */
    const getProductName = (
        productId: number
    ) => {

        const product: Product | undefined =
            products.find(
                product =>
                    product.id === productId
            );

        return product?.name ??
            "Unknown product";
    };


    /*
     * ========================================
     * SUBMIT
     * ========================================
     */
    const handleSubmit = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        setError("");


        if (!form.name.trim()) {

            return setError(
                "Sweet box name is required."
            );
        }


        if (!form.totalWeight.trim()) {

            return setError(
                "Total weight is required."
            );
        }


        if (form.price <= 0) {

            return setError(
                "Price must be greater than zero."
            );
        }


        if (!form.imageUrl.trim()) {

            return setError(
                "Please upload a sweet box image."
            );
        }


        if (form.items.length === 0) {

            return setError(
                "Add at least one sweet to the box."
            );
        }


        /*
         * Don't submit while image upload
         * is still in progress.
         */
        if (uploadingImage) {
            return;
        }


        await onSubmit(form);
    };


    return (

        <form
            className="sweet-box-form"
            onSubmit={handleSubmit}
        >

            {/* ========================================
                SWEET BOX NAME
            ======================================== */}

            <div className="form-field">

                <label htmlFor="sweet-box-name">
                    Sweet Box Name
                </label>

                <input
                    id="sweet-box-name"
                    name="name"
                    type="text"
                    placeholder="Example: Small Sweet Box"
                    value={form.name}
                    onChange={handleChange}
                />

            </div>


            {/* ========================================
                TOTAL WEIGHT
            ======================================== */}

            <div className="form-field">

                <label htmlFor="sweet-box-weight">
                    Total Weight
                </label>

                <input
                    id="sweet-box-weight"
                    name="totalWeight"
                    type="text"
                    placeholder="Example: 500g"
                    value={form.totalWeight}
                    onChange={handleChange}
                />

            </div>


            {/* ========================================
                PRICE
            ======================================== */}

            <div className="form-field">

                <label htmlFor="sweet-box-price">
                    Price (₹)
                </label>

                <input
                    id="sweet-box-price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Enter price"
                    value={form.price}
                    onChange={handleChange}
                />

            </div>


            {/* ========================================
                SWEET BOX IMAGE
            ======================================== */}

            <div className="form-field">

                <label htmlFor="sweet-box-image">
                    Sweet Box Image
                </label>

                <input
                    id="sweet-box-image"
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

                        <div>

                            <img
                                src={form.imageUrl}
                                alt={form.name || "Sweet box"}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    marginTop: "8px"
                                }}
                            />

                            <p>
                                Image uploaded successfully.
                            </p>

                        </div>
                    )}

            </div>


            {/* ========================================
                STATUS
            ======================================== */}

            <div className="form-field">

                <label htmlFor="sweet-box-active">
                    Status
                </label>

                <select
                    id="sweet-box-active"
                    name="active"
                    value={
                        form.active
                            ? "true"
                            : "false"
                    }
                    onChange={handleChange}
                >

                    <option value="true">
                        Active
                    </option>

                    <option value="false">
                        Inactive
                    </option>

                </select>

            </div>


            <hr />

            <h3>
                What's Inside?
            </h3>


            {/* ========================================
                EXISTING SWEETS
            ======================================== */}

            <div className="sweet-box-item-list">

                {form.items.length === 0 && (
                    <p>
                        No sweets added yet.
                    </p>
                )}


                {form.items.map(item => (

                    <div
                        key={item.productId}
                        className="sweet-box-item"
                    >

                        <span className="sweet-box-item-name">
                            {getProductName(
                                item.productId
                            )}
                        </span>


                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={event =>
                                updateQuantity(
                                    item.productId,
                                    Number(
                                        event.target.value
                                    )
                                )
                            }
                        />


                        <button
                            type="button"
                            className="sweet-box-remove-btn"
                            onClick={() =>
                                removeSweet(
                                    item.productId
                                )
                            }
                        >
                            Remove
                        </button>

                    </div>

                ))}

            </div>


            <hr />

            <h3>
                Add Sweet
            </h3>


            {/* ========================================
                SELECT PRODUCT
            ======================================== */}

            <div className="form-field">

                <label htmlFor="sweet-box-product">
                    Product
                </label>

                <select
                    id="sweet-box-product"
                    value={selectedProductId}
                    onChange={event =>
                        setSelectedProductId(
                            Number(
                                event.target.value
                            )
                        )
                    }
                    disabled={productsLoading}
                >

                    <option value={0}>
                        {
                            productsLoading
                                ? "Loading products..."
                                : "Select Sweet"
                        }
                    </option>


                    {products.map(product => (

                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name}
                        </option>

                    ))}

                </select>

            </div>


            {/* ========================================
                QUANTITY
            ======================================== */}

            <div className="form-field">

                <label htmlFor="sweet-box-quantity">
                    Quantity
                </label>

                <input
                    id="sweet-box-quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={event =>
                        setQuantity(
                            Number(
                                event.target.value
                            )
                        )
                    }
                />

            </div>


            <button
                type="button"
                className="sweet-box-add-btn"
                onClick={addSweet}
            >
                + Add Sweet
            </button>


            {error && (
                <p className="error">
                    {error}
                </p>
            )}


            {/* ========================================
                SAVE / UPDATE
            ======================================== */}

            <button
                type="submit"
                className="sweet-box-submit-btn"
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

export default SweetBoxForm;