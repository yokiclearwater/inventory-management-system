import React from "react";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import Input from "@/Components/Input";

function FormInput({ readOnly = false, placeholder, type = "text", name, formErrorMessage, formDataValue, handleChange, handleInput }) {
    return (
        <div>
            <Label
                className={"py-2"}
                forInput={name}
                value={placeholder}
            />

            <Input
                type={type}
                name={name}
                value={formDataValue}
                className="mt-1 block w-full text-lg"
                autoComplete="off"
                isFocused={true}
                handleChange={handleChange}
                placeholder={placeholder}
                handleInput={handleInput}
                readOnly={readOnly}
            />

            <InputError message={formErrorMessage} className="mt-2" />
        </div>
    );
}

export default FormInput;
