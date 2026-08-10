import "./Input.css";

interface InputProps {
    label?: string;
    type?: string;
    value: string | number;
    placeholder?: string;
    name?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

function Input({
    label,
    type = "text",
    value,
    placeholder,
    name,
    error,
    required = false,
    disabled = false,
    onChange,
}: InputProps) {

    return (
        <div className="input-group">
            {
                label && (
                    <label className="input-label">
                        {label}
                        {required && <span className="required">*</span>}
                    </label>
                )
            }
            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                className={`
                    input
                    ${error ? "input-error" : ""}
                `}
            />
            {
                error && (<p className="error-text">{error}</p>)
            }

        </div>
    );
}

export default Input;