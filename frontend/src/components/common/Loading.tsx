import "./Loading.css";

import heartfulnessLogo from "../../assets/heartfulness.png";

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
            className={`loading-container
                ${fullScreen ? "fullscreen" : ""}
            `}
        >

            <div className="loading-content">
                <img
                    src={heartfulnessLogo}
                    alt="Loading"
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