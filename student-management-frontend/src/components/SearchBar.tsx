interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function SearchBar({
    value,
    onChange,
    placeholder = "Search students..."
}: SearchBarProps) {

    return (
        <div className="input-group">

            <span className="input-group-text">
                🔍
            </span>

            <input
                type="text"
                className="form-control"
                value={value}
                placeholder={placeholder}
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />

            {value && (
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => onChange("")}
                >
                    Clear
                </button>
            )}

        </div>
    );
}

export default SearchBar;