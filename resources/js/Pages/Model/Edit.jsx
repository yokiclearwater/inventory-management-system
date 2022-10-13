import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Label from '@/Components/Label';
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import Button from "@/Components/Button";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const Edit = (props) => {
    const model = props.model;

    const form = useForm({
        name: model.name,
        description: model.description,
    });

    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const updateSuccess = () => {
        form.reset();
        Swal.fire('Updated Successfully', '', 'success');
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure you want to edit this model?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            confirmButtonColor: 'orange',
        }).then((result) => {
            if(result.isConfirmed) {
                form.put(route("models.update", model.id), {
                    onSuccess: () => updateSuccess(),
                    onError: () => Swal.fire('Updated Error', '', 'error'),
                });
            }
        });
    };

    return (
        <Main
            auth={props.auth}
            errors={props.errors}
            title="Model"
        >
            <Head title="Edit Model" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route('models.index')}
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
                                value="Model Name"
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
                                value="Model Description"
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
                            className="w-fit bg-orange-400 !text-base hover:bg-orange-500 shadow-lg"
                            processing={form.processing}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Main>
    );
};

export default Edit;
