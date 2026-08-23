import { useState } from "react";
import styles from "./SweetBoxSection.module.css";
import { useSweetBox } from "../../../hooks/useSweetBox";
import { useCart } from "../../../context/CartContext";

function SweetBoxSection() {
    const { sweetBoxes, loading } = useSweetBox();
    const { addToCart } = useCart();
    const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);

    if (loading) return <div className={styles.loading}>Loading Sweet Boxes...</div>;
    if (sweetBoxes.length === 0) return null;

    const selectedBox = sweetBoxes.find(box => box.id === selectedBoxId) ?? sweetBoxes[0];

    const handleAddToCart = () => {
        addToCart({ itemType: "SWEET_BOX", sweetBoxId: selectedBox.id, quantity });
    };

    return (
        <section id="sweet-boxes" className={styles.section}>
            <div className={styles.heading}>
                <span className={styles.headingDecoration}>✦</span>
                <div>
                    <h2>Our Sweet Boxes</h2>
                    <p>Pre-designed boxes by Arusuvai</p>
                </div>
                <span className={styles.headingDecoration}>✦</span>
            </div>

            <div className={styles.boxSelectors}>
                {sweetBoxes.map(box => (
                    <button key={box.id} type="button" className={selectedBox.id === box.id ? styles.selected : styles.selector} onClick={() => { setSelectedBoxId(box.id); setQuantity(1); }}>
                        <span>{box.name}</span>
                        <small>{box.totalWeight}</small>
                    </button>
                ))}
            </div>

            <div className={styles.boxContent}>
                <div className={styles.imageContainer}>
                    <img src={selectedBox.imageUrl} alt={selectedBox.name} className={styles.image} />
                </div>

                <div className={styles.details}>
                    <h3>{selectedBox.name}</h3>
                    <p className={styles.description}>A delightful assortment of our signature sweets.</p>

                    <div className={styles.highlights}>
                        <div className={styles.highlight}>
                            <span className={styles.icon}>♧</span>
                            <div>
                                <small>Total Weight</small>
                                <strong>{selectedBox.totalWeight}</strong>
                            </div>
                        </div>

                        <div className={styles.highlight}>
                            <span className={styles.icon}>◇</span>
                            <div>
                                <small>Price</small>
                                <strong>₹{selectedBox.price}</strong>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contents}>
                        <h4>What's Inside?</h4>
                        {selectedBox.items.map(item => (
                            <div key={item.productId} className={styles.item}>
                                <span>{item.productName}</span>
                                <span>{item.quantity} pcs</span>
                            </div>
                        ))}
                        <p className={styles.more}>& more delicious sweets...</p>
                    </div>

                    <div className={styles.bottomActions}>
                        <div className={styles.quantity}>
                            <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => setQuantity(q => Math.min(10, q + 1))}>+</button>
                        </div>

                        <button type="button" className={styles.addButton} onClick={handleAddToCart}>
                            <span>🛒</span> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SweetBoxSection;