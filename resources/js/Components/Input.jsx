import React, { useEffect, useRef } from 'react';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    defaultChecked = false,
    placeholder = '',
    handleInput,
    readOnly = false,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 border-2 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm` +
                    className
                }
                defaultChecked={defaultChecked}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={handleChange}
                onInput={handleInput}
                placeholder={placeholder}
                readOnly={readOnly}
            />
        </div>
    );
}
