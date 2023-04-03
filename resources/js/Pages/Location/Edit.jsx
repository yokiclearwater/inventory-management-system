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

const Edit = (props) => {
    const location = props.location;

    const form = useForm({
        product_location: location.product_location,
        inventory_location: location.inventory_location,
        description: location.description,
    });

    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const submitSuccess = () => {
        Swal.fire('Added Successfully', '', 'success');
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();

        form.put(route("locations.update", location.id), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth} title="Locations">
            <Head title="Edit Location" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route('locations.index')}
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
                        <FormInput formDataValue={form.data.product_location} placeholder={"Product Location"} formErrorMessage={form.errors.product_location} handleChange={onHandleChange} name={"product_location"} />
                        <FormInput formDataValue={form.data.inventory_location} placeholder={"Inventory Location"} formErrorMessage={form.errors.inventory_location} handleChange={onHandleChange} name={"inventory_location"} />
                        <FormTextArea formDataValue={form.data.description} formErrorMessage={form.errors.description} handleChange={onHandleChange} name={"description"} placeholder={"Description"} />
                        <Button
                            className="w-fit bg-orange-500 !text-base hover:bg-orange-700 shadow-lg"
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
