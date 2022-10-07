import React, { useEffect } from "react";
import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import TextArea from "@/Components/TextArea";
import Select from "@/Components/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';


const Create = (props) => {
    const categories = props.categories;
    const brands = props.brands;
    const models = props.models;
    const form = useForm({
        name: "",
        description: "",
        quantity: "",
        category_id: "",
        brand_id: "",
        model_id: "",
    });

    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const submitSuccess = () => {
        form.reset();
        Swal.fire('Added Successfully', '', 'success');
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();

        form.post(route("products.store"), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth}>
            <Head title="Add Product" />

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
                                value="Product Name"
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
                                value="Product Description"
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
                                value="Product Category"
                            />
                            <Select
                                className="text-xl w-full"
                                processing={form.processing}
                                name="category_id"
                                value={form.data.category_id}
                                handleChange={onHandleChange}
                            >
                                <option value="" disabled>Select your category</option>
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
                                value="Product Brand"
                            />
                            <Select
                                className="text-xl w-full"
                                processing={form.processing}
                                name="brand_id"
                                value={form.data.brand_id}
                                handleChange={onHandleChange}
                            >
                                <option value="" disabled>Select your brand</option>
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
                                value="Product Model"
                            />
                            <Select
                                className="text-xl w-full"
                                processing={form.processing}
                                name="model_id"
                                value={form.data.model_id}
                                handleChange={onHandleChange}
                            >
                                <option value="" disabled>Select your model</option>
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
