import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import Select from "@/Components/Select";
import Button from "@/Components/Button";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const Edit = (props) => {
    const item = props.item;
    const categories = props.categories;
    const brands = props.brands;
    const models = props.models;

    const form = useForm({
        name: item.name,
        serial_no: item.serial_no,
        description: item.description,
        category_id: item.category_id,
        brand_id: item.brand_id,
        model_id: item.model_id,
    });

    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const updateSuccess = () => {
        form.reset();
        Swal.fire("Updated Successfully", "", "success");
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();

        Swal.fire({
            title: "Are you sure you want to edit this item?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Proceed",
            confirmButtonColor: "orange",
        }).then((result) => {
            if (result.isConfirmed) {
                form.put(route("items.update", item.id), {
                    onSuccess: () => updateSuccess(),
                    onError: () => Swal.fire("Updated Error", "", "error"),
                });
            }
        });
    };

    return (
        <Main auth={props.auth} errors={props.errors}>
            <Head title="Edit Item" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route("items.index")}
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
                                value="Item Name"
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
                                forInput="serial_no"
                                value="Item Serial No."
                            />

                            <Input
                                type="text"
                                name="serial_no"
                                value={form.data.serial_no}
                                className="mt-1 block w-full text-lg"
                                autoComplete="off"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={"Serial No."}
                            />

                            <InputError
                                message={form.errors.serial_no}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label
                                className={"text-xl py-2"}
                                forInput="description"
                                value="Item Description"
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
                        <div>
                            <Label
                                className={"text-xl py-2"}
                                forInput="category_id"
                                value="Item Category"
                            />
                            <Select
                                className="text-xl w-full"
                                processing={form.processing}
                                name="category_id"
                                value={form.data.category_id}
                                handleChange={onHandleChange}
                            >
                                {categories.map((category) => {
                                    return (
                                        <option
                                            className="option"
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </Select>

                            <InputError
                                message={form.errors.category_id}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label
                                className={"text-xl py-2"}
                                forInput="brand_id"
                                value="Item Brand"
                            />
                            <Select
                                className="text-xl w-full"
                                processing={form.processing}
                                name="brand_id"
                                value={form.data.brand_id}
                                handleChange={onHandleChange}
                            >
                                {brands.map((brand) => {
                                    return (
                                        <option
                                            className="option"
                                            key={brand.id}
                                            value={brand.id}
                                        >
                                            {brand.name}
                                        </option>
                                    );
                                })}
                            </Select>

                            <InputError
                                message={form.errors.brand_id}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label
                                className={"text-xl py-2"}
                                forInput="model_id"
                                value="Item Model"
                            />
                            <Select
                                className="text-xl w-full"
                                processing={form.processing}
                                name="model_id"
                                value={form.data.model_id}
                                handleChange={onHandleChange}
                            >
                                {models.map((model) => {
                                    return (
                                        <option
                                            className="option"
                                            key={model.id}
                                            value={model.id}
                                        >
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </Select>

                            <InputError
                                message={form.errors.model_id}
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
