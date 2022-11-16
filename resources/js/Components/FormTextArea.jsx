import React from "react";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";

function FormTextArea({
    placeholder,
    name,
    formErrorMessage,
    formDataValue,
    handleChange,
    processing,
}) {
    return (
        <div>
            <Label
                className={"!text-xl py-2"}
                forInput={name}
                value={placeholder}
            />

            <TextArea
                className="w-full text-lg"
                placeholder={placeholder}
                processing={processing}
                name={name}
                value={formDataValue}
                handleChange={handleChange}
            />

            <InputError message={formErrorMessage} className="mt-2" />
        </div>
    );
}

export default FormTextArea;
