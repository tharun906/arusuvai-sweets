import { useEffect, useState } from "react";
import type { SweetBox } from "../types/SweetBox";
import type { SweetBoxRequest } from "../types/SweetBoxRequest";
import { sweetBoxAdminService } from "../services/ sweetBoxAdminService";

export function useSweetBoxAdmin() {

    const [sweetBoxes, setSweetBoxes] = useState<SweetBox[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getSweetBoxes = async () => {

        setLoading(true);
        setError("");

        try {
            const data = await sweetBoxAdminService.getAll();
            setSweetBoxes(data);
        } catch (error) {
            console.error("Failed to fetch sweet boxes:", error);
            setError("Unable to load sweet boxes.");
        } finally {
            setLoading(false);
        }
    };

    const createSweetBox = async (
        request: SweetBoxRequest
    ) => {

        try {
            await sweetBoxAdminService.create(request);
            await getSweetBoxes();
        } catch (error) {
            console.error("Failed to create sweet box:", error);
            throw error;
        }
    };

    const updateSweetBox = async (
        sweetBoxId: number,
        request: SweetBoxRequest
    ) => {

        try {
            await sweetBoxAdminService.update(
                sweetBoxId,
                request
            );

            await getSweetBoxes();
        } catch (error) {
            console.error("Failed to update sweet box:", error);
            throw error;
        }
    };

    const deleteSweetBox = async (
        sweetBoxId: number
    ) => {

        try {
            await sweetBoxAdminService.delete(
                sweetBoxId
            );

            await getSweetBoxes();
        } catch (error) {
            console.error("Failed to delete sweet box:", error);
            throw error;
        }
    };

    useEffect(() => {
        getSweetBoxes();
    }, []);

    return {
        sweetBoxes,
        loading,
        error,
        getSweetBoxes,
        createSweetBox,
        updateSweetBox,
        deleteSweetBox
    };
}