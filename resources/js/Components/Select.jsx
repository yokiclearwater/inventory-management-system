import React from "react";

function Select({
    className = "",
    name,
    value,
    processing,
    required = false,
    handleChange,
    children,
}) {
    return (
        <div className="flex flex-col items-start">
            <select
                disabled={processing}
                required={required}
                className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${className}`}
                value={value}
                name={name}
                onChange={(e) => handleChange(e)}
            >
                {children}
            </select>
        </div>
    );
}

export default Select;
