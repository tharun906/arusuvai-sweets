import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {

    const token =
        localStorage.getItem("token");

    /*
     * Use the normal customer JWT only when
     * the request does not already provide
     * its own Authorization header.
     */
    if (
        token &&
        !config.headers.Authorization
    ) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

export default api;