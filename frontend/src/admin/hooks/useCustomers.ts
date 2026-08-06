import { useEffect, useState } from "react";
import type { Customer } from "../types/Customer";
import { getCustomers } from "../services/customerService";

export function useCustomers() {

    const [customers, setCustomers] =
        useState<Customer[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadCustomers = async () => {

            try {

                const data =
                    await getCustomers();

                setCustomers(data);

            } finally {

                setLoading(false);

            }

        };

        loadCustomers();

    }, []);

    return {

        customers,

        loading,

    };

}