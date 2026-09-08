import styles from "./EmailNotification.module.css";

function EmailNotification() {
    return (
        <div className={styles.notification}>
            <div className={styles.track}>
                <span>
                    📧 Order updates & important information will be sent to your registered email.
                </span>

                <span>
                    📧 Order updates & important information will be sent to your registered email.
                </span>
                <span>
                    📧 Order updates & important information will be sent to your registered email.
                </span>
                <span>
                    📧 Order updates & important information will be sent to your registered email.
                </span>
            </div>
        </div>
    );
}

export default EmailNotification;