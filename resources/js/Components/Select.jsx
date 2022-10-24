import React from "react";

function Select({
    className = "",
    name,
    value,
    processing,
    required = false,
    handleChange,
    children,
    defaultValue = undefined,
}) {
    return (
        <div className="flex flex-col items-start">
            <select
                defaultValue={defaultValue}
                disabled={processing}
                required={required}
                className={`border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm ${className}`}
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
