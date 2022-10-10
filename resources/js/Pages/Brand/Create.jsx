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

        form.post(route("brands.store"), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth}>
            <Head title="Add Brand" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route('categories.index')}
                        className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faBackward} /> Back
                    </a>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <form
                        className="p-8 flex flex-col gap-4"
                        onSubmit={onHandleSubmit}
                    >
                        <div>
                            <Label
                                className={"text-xl py-2"}
                                forInput="name"
                                value="Brand Name"
                            />

                            <Input
                                type="text"
                                name="name"
                                value={form.data.name}
                                className="mt-1 block w-full text-lg"
                                autoComplete="off"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={"Name"}
                            />

                            <InputError
                                message={form.errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label
                                className={"text-xl py-2"}
                                forInput="description"
                                value="Brand Description"
                            />
                            <TextArea
                                className="w-full text-lg"
                                placeholder={"Description"}
                                processing={form.processing}
                                name="description"
                                value={form.data.description}
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={form.errors.description}
                                className="mt-2"
                            />
                        </div>
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
