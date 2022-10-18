import React, { useEffect } from "react";
import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/Components/FormInput";
import FormSelect from "@/Components/FormSelect";
import Swal from "sweetalert2";

const Create = (props) => {
    const form = useForm({
        product_id: "",
        serial_no: "",
        received_by: "",
        issued_by: "",
        installed_date: "",
        location: "",
        product_location: "",
        in_stock_date: "",
        out_of_stock_date: "",
        status_id: "",
    });


    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const submitSuccess = () => {
        Swal.fire('Added Successfully', '', 'success');
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();

        form.post(route("items.store"), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth} title="Items">
            <Head title="Add Item" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route('items.index')}
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
                        <FormSelect name={"product_id"} formDataValue={form.data.product_id} placeholder={"Product Name"} handleChange={onHandleChange} formErrorMessage={form.errors.product_id} className={"uppercase"}>
                            <option value={""} disabled>Select A Product</option>
                            {props.products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </FormSelect>
                        <FormInput name={"serial_no"} formDataValue={form.data.serial_no} placeholder={"Serial Number"} handleChange={onHandleChange} formErrorMessage={form.errors.serial_no}  />
                        <FormInput name={"received_by"} formDataValue={form.data.received_by} placeholder={"Received By"} handleChange={onHandleChange} formErrorMessage={form.errors.received_by}  />
                        <FormInput name={"issued_by"} formDataValue={form.data.issued_by} placeholder={"Issued By"} handleChange={onHandleChange} formErrorMessage={form.errors.issued_by}  />
                        <FormInput name={"installed_date"} type={"date"} formDataValue={form.data.installed_date} placeholder={"Installed At"} handleChange={onHandleChange} formErrorMessage={form.errors.installed_date} />
                        <FormInput name={"location"} formDataValue={form.data.location} placeholder={"Location"} handleChange={onHandleChange} formErrorMessage={form.errors.location} />
                        <FormInput name={"product_location"} type={"text"} formDataValue={form.data.product_location} placeholder={"Inventory Location"} handleChange={onHandleChange} formErrorMessage={form.errors.product_location}  />
                        <FormInput name={"in_stock_date"} type={"date"} formDataValue={form.data.in_stock_date} placeholder={"In Stock Date"} handleChange={onHandleChange} formErrorMessage={form.errors.in_stock_date} />
                        <FormInput name={"out_of_stock_date"} type={"date"} formDataValue={form.data.out_of_stock_date} placeholder={"Out Of Stock Date"} handleChange={onHandleChange} formErrorMessage={form.errors.out_of_stock_date}  />
                        <FormSelect name={"status_id"} formDataValue={form.data.status_id} placeholder={"Statues"} handleChange={onHandleChange} formErrorMessage={form.errors.status_id} className={"uppercase"}>
                            <option value={""} disabled>Select A Statuses</option>
                            {props.statuses.map((status) => (
                                <option key={status.id} value={status.id}>{status.type}</option>
                            ))}
                        </FormSelect>
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
