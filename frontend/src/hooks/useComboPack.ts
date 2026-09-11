import { useEffect, useState } from "react";
import type { ComboPack } from "../admin/types/ComboPack";
import { getComboPacks } from "../admin/services/comboPackService";


export function useComboPack() {
    const [comboPacks, setComboPacks] = useState<ComboPack[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComboPacks = async () => {
            try {
                const data = await getComboPacks();
                setComboPacks(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load Combo Pack.");
            } finally {
                setLoading(false);
            }
        };

        fetchComboPacks();
    }, []);

    return {
        comboPacks,
        loading,
        error,
    };
}