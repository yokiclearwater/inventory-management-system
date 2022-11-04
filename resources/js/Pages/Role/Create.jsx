import React, { useEffect } from "react";
import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Create = (props) => {
    const form = useForm({
        name: "",
        permissions: [],
    });

    const onHandleChange = (event) => {
        form.setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handlePermission = (e) => {
        let id = e.target.value;
        if (e.target.checked) {
            form.setData("permissions", [...form.data.permissions, id]);
        } else {
            form.setData(
                "permissions",
                form.data.permissions.filter((item) => {
                    return item !== id;
                })
            );
        }
    };

    const submitSuccess = () => {
        Swal.fire("Added Successfully", "", "success");
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();

        form.post(route("roles.store"), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth}>
            <Head title="Add Role" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route("roles.index")}
                        className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
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
                                className={"!text-xl py-2"}
                                forInput="name"
                                value="Role Name"
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
                                className={"!text-xl py-2"}
                                forInput="permissions"
                                value="Permission"
                            />
                            <div className="flex flex-wrap gap-4">
                                {props.permissions.map((permission) => (
                                    <div
                                        key={permission.id}
                                        className="flex items-center text-lg"
                                    >
                                        <Input
                                            type="checkbox"
                                            name="permissions"
                                            value={permission.id}
                                            className="text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 h-5 w-5"
                                            isFocused={true}
                                            handleChange={handlePermission}

                                        />
                                        <label
                                            name="permissions"
                                            htmlFor="permissions"
                                            className="ml-2 font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            {permission.type.toUpperCase()}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
