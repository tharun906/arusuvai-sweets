import "./Loading.css";

import loading from "../../assets/Loading/Loading.png";

interface LoadingProps {
    text?: string;
    fullScreen?: boolean;
}

function Loading({
    text = "Loading...",
    fullScreen = true,
}: LoadingProps) {

    return (
        <div
            className={`loading-container ${
                fullScreen ? "fullscreen" : ""
            }`}
        >

            <div className="loading-content">

                <img
                    src={loading}
                    alt="Arusuvai Sweets"
                    className="loading-logo"
                />

                <h2>
                    ARUSUVAI SWEETS
                </h2>

                <p>
                    {text}
                </p>

            </div>

        </div>
    );
}

export default Loading;