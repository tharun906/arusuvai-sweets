import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import Toast from "../../components/common/Toast";
import Loading from "../../components/common/Loading";

import {
    getComboPacks,
    createComboPack,
    updateComboPack,
    changeComboPackStatus
} from "../services/comboPackService";

import type { ComboPack } from "../types/ComboPack";
import type { ComboPackRequest } from "../types/ComboPackRequest";

import "../styles/AdminComboPack.css";
import ComboPackForm from "../components/ComboPackForm";

const EMPTY_COMBO_PACK: ComboPackRequest = {
    title: "",
    contents: "",
    weight: "",
    price: 0,
    imageUrl: ""
};

function ComboPackManagement() {

    const [comboPack, setComboPack] =
        useState<ComboPack | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [showModal, setShowModal] =
        useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success" as
            "success" |
            "error" |
            "warning" |
            "info"
    });

    const loadComboPack = async () => {

        try {

            setLoading(true);

            const data =
                await getComboPacks();

            setComboPack(
                data.length > 0
                    ? data[0]
                    : null
            );

        } catch (error) {

            console.error(
                "Failed to load Combo Pack:",
                error
            );

            setToast({
                show: true,
                message:
                    "Failed to load Combo Pack.",
                type: "error"
            });

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        loadComboPack();

    }, []);

    useEffect(() => {

        if (!toast.show) return;

        const timer =
            setTimeout(() => {

                setToast(previous => ({
                    ...previous,
                    show: false
                }));

            }, 3000);

        return () =>
            clearTimeout(timer);

    }, [toast.show]);

    const handleSubmit = async (
        request: ComboPackRequest
    ) => {

        try {

            setSaving(true);

            if (comboPack) {

                const updated =
                    await updateComboPack(
                        comboPack.id,
                        request
                    );

                setComboPack(updated);

                setToast({
                    show: true,
                    message:
                        "Combo Pack updated successfully.",
                    type: "success"
                });

            } else {

                const created =
                    await createComboPack(
                        request
                    );

                setComboPack(created);

                setToast({
                    show: true,
                    message:
                        "Combo Pack created successfully.",
                    type: "success"
                });

            }

            setShowModal(false);

        } catch (error) {

            console.error(
                "Failed to save Combo Pack:",
                error
            );

            setToast({
                show: true,
                message:
                    "Failed to save Combo Pack.",
                type: "error"
            });

        } finally {

            setSaving(false);

        }

    };

    const handleStatusChange =
        async () => {

            if (!comboPack) return;

            try {

                await changeComboPackStatus(
                    comboPack.id,
                    !comboPack.active
                );

                setComboPack({
                    ...comboPack,
                    active: !comboPack.active
                });

                setToast({
                    show: true,
                    message:
                        comboPack.active
                            ? "Combo Pack deactivated."
                            : "Combo Pack activated.",
                    type: "success"
                });

            } catch (error) {

                console.error(
                    "Failed to change Combo Pack status:",
                    error
                );

                setToast({
                    show: true,
                    message:
                        "Failed to change Combo Pack status.",
                    type: "error"
                });

            }

        };

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="admin-combo-pack-page">

                <h1 className="admin-combo-pack-title">
                    Combo Pack Management
                </h1>

                {!comboPack ? (

                    <div className="combo-empty">

                        <p>
                            No Combo Pack has been created yet.
                        </p>

                        <button
                            type="button"
                            className="combo-primary-btn"
                            onClick={() => {

                                setShowModal(true);

                            }}
                        >
                            + Create Combo Pack
                        </button>

                    </div>

                ) : (

                    <div className="combo-pack-card">

                        <div className="combo-pack-image-container">

                            {comboPack.imageUrl ? (

                                <img
                                    src={comboPack.imageUrl}
                                    alt={comboPack.title}
                                    className="combo-pack-image"
                                />

                            ) : (

                                <div className="combo-no-image">
                                    No Image
                                </div>

                            )}

                        </div>

                        <div className="combo-pack-info">

                            <h2>
                                {comboPack.title}
                            </h2>

                            <p>
                                <strong>Contents:</strong>{" "}
                                {comboPack.contents}
                            </p>

                            <p>
                                <strong>Weight:</strong>{" "}
                                {comboPack.weight}
                            </p>

                            <p>
                                <strong>Price:</strong>{" "}
                                ₹{comboPack.price}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {comboPack.active
                                    ? "🟢 Active"
                                    : "🔴 Inactive"}
                            </p>

                            <div className="combo-actions">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleStatusChange
                                    }
                                >
                                    {comboPack.active
                                        ? "Deactivate"
                                        : "Activate"}
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                <Modal
                    open={showModal}
                    title={
                        comboPack
                            ? "Edit Combo Pack"
                            : "Create Combo Pack"
                    }
                    onClose={() => {
                        setShowModal(false);
                    }}
                >

                    <ComboPackForm
                        initialValues={
                            comboPack
                                ? {
                                    title: comboPack.title,
                                    contents: comboPack.contents,
                                    weight: comboPack.weight,
                                    price: comboPack.price,
                                    imageUrl: comboPack.imageUrl
                                }
                                : EMPTY_COMBO_PACK
                        }
                        buttonText={
                            comboPack
                                ? "Update Combo Pack"
                                : "Create Combo Pack"
                        }
                        loading={saving}
                        onSubmit={handleSubmit}
                    />

                </Modal>

            </div>

        </>

    );

}

export default ComboPackManagement;