import { useEffect, useState } from "react";
import { sweetBoxService } from "../services/sweetBoxService";
import type { SweetBox } from "../types/SweetBox";

export function useSweetBox() {

    const [sweetBoxes, setSweetBoxes] = useState<SweetBox[]>([]);
    const [loading, setLoading] = useState(false);

    const getSweetBoxes = async () => {

        setLoading(true);

        try {
            const data = await sweetBoxService.getSweetBoxes();
            setSweetBoxes(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSweetBoxes();
    }, []);

    return {
        sweetBoxes,
        loading,
        getSweetBoxes
    };
}