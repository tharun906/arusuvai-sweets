import { useEffect, useState } from "react";
import type { AdminSummary } from "../types/AdminSummary";
import { getAdminSummary } from "../services/adminSummaryService";

export function useAdminSummary() {

    const [summary, setSummary] =
        useState<AdminSummary | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadSummary = async () => {

            try {

                const data =
                    await getAdminSummary();

                setSummary(data);

            } finally {

                setLoading(false);

            }

        };

        loadSummary();

    }, []);

    return {

        summary,

        loading,

    };

}