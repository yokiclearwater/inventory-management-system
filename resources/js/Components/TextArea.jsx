import React from "react";

function TextArea({
    className = "",
    name,
    value,
    processing,
    required = false,
    placeholder,
    handleChange,
}) {
    return (
        <div className="flex flex-col items-start">
            <textarea
                disabled={processing}
                required={required}
                className={`border-gray-300 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${className}`}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={(e) => handleChange(e)}
            ></textarea>
        </div>
    );
}

export default TextArea;
