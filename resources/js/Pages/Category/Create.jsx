import React, { useEffect } from "react";
import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import TextArea from "@/Components/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import FormInput from "@/Components/FormInput";
import FormTextArea from './../../Components/FormTextArea';

const Create = (props) => {
    const form = useForm({
        name: "",
        description: "",
    });

    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const submitSuccess = () => {
        Swal.fire('Added Successfully', '', 'success');
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();

        form.post(route("categories.store"), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth}>
            <Head title="Add Category" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route('categories.index')}
                        className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faBackward} /> Back
                    </a>
                </div>
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <form
                        className="p-8 flex flex-col gap-4"
                        onSubmit={onHandleSubmit}
                    >
                        <FormInput formDataValue={form.data.name} placeholder={"Category Name"} formErrorMessage={form.errors.name} handleChange={onHandleChange} name={"name"} />
                        <FormTextArea formDataValue={form.data.description} formErrorMessage={form.errors.description} handleChange={onHandleChange} name={"description"} placeholder={"Category Description"} />
                        <Button
                            className="w-fit bg-green-500 !text-base hover:bg-green-700 shadow-lg"
                            processing={form.processing}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </Main>
    );
};

export default Create;
