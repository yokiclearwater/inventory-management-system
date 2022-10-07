import React from "react";
import Label from "@/Components/Label";
import Select from "@/Components/Select";
import InputError from "@/Components/InputError";

function FormSelect({placeholder, className, name, formErrorMessage, formDataValue, handleChange, children }) {
    return (
        <div>
            <Label
                className={"text-xl py-2"}
                forInput={name}
                value={placeholder}
            />

            <Select name={name} className={`w-full ${className}`} value={formDataValue} handleChange={handleChange}>
                {children}
            </Select>

            <InputError message={formErrorMessage} className="mt-2" />
        </div>
    );
}

export default FormSelect;
