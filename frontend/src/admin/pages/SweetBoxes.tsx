import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import Toast from "../../components/common/Toast";
import SweetBoxForm from "../components/SweetBoxForm";
import { useSweetBoxAdmin } from "../hooks/useSweetBoxAdmin";
import type { SweetBox } from "../types/SweetBox";
import type { SweetBoxRequest } from "../types/SweetBoxRequest";
import "../styles/AdminSweetBoxes.css";

const EMPTY_SWEET_BOX: SweetBoxRequest = {
    name: "",
    totalWeight: "",
    price: 0,
    imageUrl: "",
    active: true,
    items: []
};

function SweetBoxes() {
    const { sweetBoxes, loading, error, createSweetBox, updateSweetBox, deleteSweetBox } = useSweetBoxAdmin();
    const [editingSweetBox, setEditingSweetBox] = useState<SweetBox | null>(null);
    const [form, setForm] = useState<SweetBoxRequest>(EMPTY_SWEET_BOX);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success" as "success" | "error" | "warning" | "info"
    });

    useEffect(() => {
        if (!toast.show) return;
    
        const timer = setTimeout(() => {
            setToast(previous => ({
                ...previous,
                show: false
            }));
        }, 3000);
    
        return () => clearTimeout(timer);
    }, [toast.show]);

    const showToast = (message: string, type: "success" | "error" | "warning" | "info") => {
        setToast({ show: true, message, type });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSweetBox(null);
        setForm(EMPTY_SWEET_BOX);
    };

    const handleSubmit = async (request: SweetBoxRequest) => {
        setSaving(true);
        try {
            if (editingSweetBox) {
                await updateSweetBox(editingSweetBox.id, request);
                showToast("Sweet box updated successfully.", "success");
            } else {
                await createSweetBox(request);
                showToast("Sweet box created successfully.", "success");
            }
            closeModal();
        } catch (error) {
            console.error("Sweet box save failed:", error);
            showToast("Unable to save sweet box.", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (sweetBox: SweetBox) => {
        setEditingSweetBox(sweetBox);
        setForm({
            name: sweetBox.name,
            totalWeight: sweetBox.totalWeight,
            price: sweetBox.price,
            imageUrl: sweetBox.imageUrl,
            active: sweetBox.active,
            items: sweetBox.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        });
        setShowModal(true);
    };

    const handleDelete = async (sweetBox: SweetBox) => {
        const confirmed = window.confirm(`Delete "${sweetBox.name}"?`);
        if (!confirmed) return;

        try {
            await deleteSweetBox(sweetBox.id);
            showToast("Sweet box deleted successfully.", "success");
        } catch (error) {
            console.error("Sweet box delete failed:", error);
            showToast("Unable to delete sweet box.", "error");
        }
    };

    if (loading) return <h2 className="sweet-box-loading">Loading Sweet Boxes...</h2>;
    if (error) return <h2 className="sweet-box-error">{error}</h2>;

    return (
        <>
            <Toast show={toast.show} message={toast.message} type={toast.type} />

            <div className="admin-sweet-boxes-page">
                <div className="sweet-boxes-header">
                    <h1 className="admin-sweet-boxes-title">Sweet Box Management</h1>
                    <button
                        className="add-sweet-box-btn"
                        onClick={() => {
                            setEditingSweetBox(null);
                            setForm(EMPTY_SWEET_BOX);
                            setShowModal(true);
                        }}
                    >
                        + Add Sweet Box
                    </button>
                </div>

                <hr className="admin-sweet-boxes-divider" />

                <div className="sweet-box-grid">
                    {sweetBoxes.length === 0 ? (
                        <div className="sweet-box-empty">
                            <h3>No Sweet Boxes Found</h3>
                            <p>Create your first sweet box.</p>
                        </div>
                    ) : (
                        sweetBoxes.map(sweetBox => (
                            <div key={sweetBox.id} className="sweet-box-card">
                                <div className="sweet-box-image-container">
                                    {sweetBox.imageUrl ? (
                                        <img src={sweetBox.imageUrl} alt={sweetBox.name} className="sweet-box-image" />
                                    ) : (
                                        <div className="sweet-box-no-image">No Image</div>
                                    )}
                                </div>

                                <div className="sweet-box-content">
                                    <div className="sweet-box-title-row">
                                        <h2>{sweetBox.name}</h2>
                                        <span className={sweetBox.active ? "sweet-box-active" : "sweet-box-inactive"}>
                                            {sweetBox.active ? "Active" : "Inactive"}
                                        </span>
                                    </div>

                                    <p className="sweet-box-weight">{sweetBox.totalWeight}</p>
                                    <p className="sweet-box-price">₹{sweetBox.price}</p>

                                    <div className="sweet-box-items">
                                        <h4>What's Inside</h4>
                                        {sweetBox.items.length === 0 ? (
                                            <p>No sweets added.</p>
                                        ) : (
                                            <ul>
                                                {sweetBox.items.map(item => (
                                                    <li key={item.productId}>
                                                        <span>{item.productName}</span>
                                                        <span>× {item.quantity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="sweet-box-actions">
                                        <button onClick={() => handleEdit(sweetBox)}>Edit</button>
                                        <button onClick={() => handleDelete(sweetBox)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Modal
                    open={showModal}
                    title={editingSweetBox ? "Edit Sweet Box" : "Add Sweet Box"}
                    onClose={closeModal}
                >
                    <SweetBoxForm
                        initialValues={form}
                        buttonText={editingSweetBox ? "Update Sweet Box" : "Save Sweet Box"}
                        loading={saving}
                        onSubmit={handleSubmit}
                    />
                </Modal>
            </div>
        </>
    );
}

export default SweetBoxes;