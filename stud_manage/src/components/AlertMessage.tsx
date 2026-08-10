interface AlertMessageProps {
    type: "success" | "danger" | "warning" | "info";
    message: string;
    onClose?: () => void;
}

function AlertMessage({
    type,
    message,
    onClose
}: AlertMessageProps) {

    return (
        <div
            className={`alert alert-${type} alert-dismissible fade show`}
            role="alert"
        >
            {message}

            {onClose && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            )}
        </div>
    );
}

export default AlertMessage;