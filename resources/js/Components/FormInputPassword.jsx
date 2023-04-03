import React, { useState } from "react";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import Input from "@/Components/Input";

function FormInputPassword({
    placeholder,
    name,
    formErrorMessage,
    formDataValue,
    handleChange,
    handleInput,
}) {
    const [showPass, setShowPass] = useState(false);

    return (
        <div>
            <Label
                className={"py-2"}
                forInput={name}
                value={placeholder}
            />

            <div className="relative">
                <Input
                    type={showPass ? "text" : "password"}
                    name={name}
                    value={formDataValue}
                    className="mt-1 block w-full text-lg"
                    autoComplete="off"
                    isFocused={true}
                    handleChange={handleChange}
                    placeholder={placeholder}
                    handleInput={handleInput}
                />
                <span onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-base cursor-pointer hover:text-gray-500">
                    {!showPass ? "Show" : "Hide"}
                </span>
            </div>

            <InputError message={formErrorMessage} className="mt-2" />
        </div>
    );
}

export default FormInputPassword;
