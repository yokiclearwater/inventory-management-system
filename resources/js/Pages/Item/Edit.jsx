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
import FormSelect from "@/Components/FormSelect";
import FormInput from "@/Components/FormInput";
import FormTextArea from "@/Components/FormTextArea";

const Edit = (props) => {
    const item = props.item;
    const location = props.location;

    const form = useForm({
        product_id: item.product_id,
        unit: item.unit,
        quantity: item.quantity,
        received_by: item.received_by,
        issued_by: item.issued_by,
        location_id: item.location_id,
        in_stock_date: item.in_stock_date,
        out_of_stock_date: item.out_of_stock_date,
        status_id: item.status_id,
        description: item.description,
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
                form.put(route("items.update", item.id), {
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
            title={"Items"}
        >
            <Head title="Edit Item" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route('items.index')}
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
                        <FormSelect name={"product_id"} formDataValue={form.data.product_id} placeholder={"Product Name"} handleChange={onHandleChange} formErrorMessage={form.errors.product_id} className={"uppercase"}>
                            <option value={""} disabled>Select A Product</option>
                            {props.products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </FormSelect>
                        <FormInput name={"unit"} formDataValue={form.data.unit} placeholder={"Unit (Ex: PCS, SET, BOX)"} handleChange={onHandleChange} formErrorMessage={form.errors.unit}  />
                        <FormInput name={"quantity"} formDataValue={form.data.quantity} placeholder={"Quantity"} handleChange={onHandleChange} formErrorMessage={form.errors.quantity}  />
                        <FormSelect name={"location_id"} formDataValue={form.data.location_id} placeholder={"Locations (Product Location, Inventory Location)"} handleChange={onHandleChange} formErrorMessage={form.errors.location_id} className={"uppercase"}>
                            <option value={""} disabled>Select A Location</option>
                            {props.locations.map((location) => (
                                <option key={location.id} value={location.id}>{`${location.product_location}, ${location.inventory_location}`}</option>
                            ))}
                        </FormSelect>
                        <FormInput name={"received_by"} formDataValue={form.data.received_by} placeholder={"Received By"} handleChange={onHandleChange} formErrorMessage={form.errors.received_by}  />
                        <FormInput name={"issued_by"} formDataValue={form.data.issued_by} placeholder={"Issued By"} handleChange={onHandleChange} formErrorMessage={form.errors.issued_by}  />
                        <FormInput name={"in_stock_date"} type={"date"} formDataValue={form.data.in_stock_date} placeholder={"In Stock Date"} handleChange={onHandleChange} formErrorMessage={form.errors.in_stock_date} />
                        <FormInput name={"out_of_stock_date"} type={"date"} formDataValue={form.data.out_of_stock_date} placeholder={"Out Of Stock Date"} handleChange={onHandleChange} formErrorMessage={form.errors.out_of_stock_date}  />
                        <FormSelect name={"status_id"} formDataValue={form.data.status_id} placeholder={"Status"} handleChange={onHandleChange} formErrorMessage={form.errors.status_id} className={"uppercase"}>
                            <option value={""} disabled>Select A Status</option>
                            {props.statuses.map((status) => (
                                <option key={status.id} value={status.id}>{(status.type).replaceAll('_', ' ')}</option>
                            ))}
                        </FormSelect>
                        <FormTextArea formDataValue={form.data.description} formErrorMessage={form.errors.description} handleChange={onHandleChange} name={"description"} placeholder={"Item Description (Optional)"} processing={form.processing} />
                        <Button
                            className="w-fit bg-orange-500 !text-base hover:bg-orange-600 shadow-lg"
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
