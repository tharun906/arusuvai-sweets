import { useState } from "react";
import styles from "./SweetBoxSection.module.css";
import { useSweetBox } from "../../../hooks/useSweetBox";
import { useProducts } from "../../../hooks/useProducts";
import { useCart } from "../../../context/CartContext";
import QuantitySelector from "../../common/QuantitySelector";
import headingLeft from "../../../assets/headingLeft.webp";
import headingRight from "../../../assets/headingRight.webp";
import price from "../../../assets/price.webp";
import weight from "../../../assets/weight.webp";
import Loading from "../../common/Loading";

function SweetBoxSection() {
    const { sweetBoxes, loading: sweetBoxLoading } = useSweetBox();
    const { products, loading: productsLoading } = useProducts();
    const { addToCart } = useCart();
    const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const loading = sweetBoxLoading || productsLoading;

    if (loading) return <Loading />;
    if (sweetBoxes.length === 0) return null;

    const selectedBox = sweetBoxes.find(box => box.id === selectedBoxId) ?? sweetBoxes[0];

    const handleSelectBox = (id: number) => {
        setSelectedBoxId(id);
        setQuantity(1);
    };

    const handleAddToCart = () => {
        addToCart({ itemType: "SWEET_BOX", sweetBoxId: selectedBox.id, quantity });
    };

    return (
        <section id="sweet-boxes" className={styles.section}>
            <div className={styles.heading}>
                <img src={headingLeft} alt="" className={styles.headingImage} />
                <div>
                    <h2>Our Sweet Boxes</h2>
                    <p>Pre-designed boxes by Arusuvai</p>
                </div>
                <img src={headingRight} alt="" className={styles.headingImage} />
            </div>

            <div className={styles.boxSelectors}>
                {sweetBoxes.map(box => (
                    <button
                        key={box.id}
                        type="button"
                        className={`${selectedBox.id === box.id ? styles.selected : styles.selector} ${
                            !box.active ? styles.unavailable : ""
                        }`}
                        onClick={() => handleSelectBox(box.id)}
                    >
                        <span>{box.name}</span>
                        <small>{box.totalWeight}</small>

                        {!box.active && (
                            <em>Unavailable</em>
                        )}
                    </button>
                ))}
            </div>

            <div
                className={`${styles.boxContent} ${
                    !selectedBox.active ? styles.unavailableContent : ""
                }`}
            >
                <div className={styles.imageContainer}>
                    <img src={selectedBox.imageUrl} alt={selectedBox.name} className={styles.image} />
                </div>

                <div className={styles.details}>
                    <div className={styles.productHeader}>
                        <div>
                            <h3>{selectedBox.name}</h3>
                            <span className={styles.weightText}>{selectedBox.totalWeight}</span>
                        </div>
                        <strong className={styles.productPrice}>₹{selectedBox.price}</strong>
                    </div>

                    <p className={styles.description}>A delightful assortment of our signature sweets.</p>

                    <div className={styles.highlights}>
                        <div className={styles.highlight}>
                            <img src={weight} alt="" className={styles.highlightIcon} />
                            <div>
                                <small>Total Weight</small>
                                <strong>{selectedBox.totalWeight}</strong>
                            </div>
                        </div>

                        <div className={styles.highlight}>
                            <img src={price} alt="" className={styles.highlightIcon} />
                            <div>
                                <small>Price</small>
                                <strong>₹{selectedBox.price}</strong>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contents}>
                        <h4>What's Inside?</h4>
                        <div className={styles.items}>
                            {selectedBox.items.map(item => {
                                const product = products.find(p => p.id === item.productId);

                                return (
                                    <div key={item.productId} className={styles.item}>
                                        <div className={styles.itemProduct}>
                                            <div className={styles.itemImageContainer}>
                                                {product?.imageUrl ? (
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={item.productName}
                                                        className={styles.itemImage}
                                                    />
                                                ) : (
                                                    <div className={styles.itemImagePlaceholder}>🍬</div>
                                                )}
                                            </div>
                                            <span>{item.productName}</span>
                                        </div>
                                        <span className={styles.itemQuantity}>{item.quantity} pcs</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.bottomActions}>
                        <QuantitySelector value={quantity} min={1} max={10} onChange={setQuantity} />
                        <button
                            type="button"
                            className={styles.addButton}
                            onClick={handleAddToCart}
                            disabled={!selectedBox.active}
                        >
                            <span>🛒</span>
                            {selectedBox.active ? "Add to Cart" : "Unavailable"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SweetBoxSection;