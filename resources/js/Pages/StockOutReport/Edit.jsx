import React, { useState } from "react";
import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import FormSelect from "@/Components/FormSelect";
import FormInput from "@/Components/FormInput";

const Edit = (props) => {
    const form = useForm({
        item_id: "",
        received_by: "",
        issued_by: props.auth.user.name,
        quantity: "",
        stock_out_date: "",
    });

    const [item, setItem] = useState(null);

    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const submitSuccess = () => {
        Swal.fire("Added Successfully", "", "success");
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();

        form.post(route("stock-out-reports.store"), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth}>
            <Head title="Add Model" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route("models.index")}
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
                        <FormSelect
                            name={"item_id"}
                            formDataValue={form.data.item_id}
                            placeholder={"Item"}
                            handleChange={(e) => {
                                onHandleChange(e);
                                setItem(
                                    props.items.find(
                                        (item) => item.id == e.target.value
                                    )
                                );
                            }}
                            formErrorMessage={form.errors.item_id}
                            className={"uppercase"}
                        >
                            <option value={""} disabled>
                                Select A Item
                            </option>
                            {props.items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.product.name}
                                </option>
                            ))}
                        </FormSelect>
                        {item && (
                            <>
                                <FormInput
                                    formDataValue={item.part_number}
                                    placeholder={"Part Number"}
                                    readOnly={true}
                                />
                                <FormInput
                                    formDataValue={item.quantity}
                                    placeholder={"In Stock Quantity"}
                                    readOnly={true}
                                />
                            </>
                        )}
                        <FormInput
                            formDataValue={form.data.received_by}
                            formErrorMessage={form.errors.received_by}
                            handleChange={onHandleChange}
                            name="received_by"
                            placeholder={"Receiver"}
                        />
                        <FormInput
                            formDataValue={form.data.issued_by}
                            formErrorMessage={form.errors.issued_by}
                            handleChange={onHandleChange}
                            name="issued_by"
                            placeholder={"Issuer"}
                            readOnly={true}
                        />
                        <FormInput
                            type="number"
                            name={"quantity"}
                            formDataValue={form.data.quantity}
                            placeholder={"Stock Out Quantity"}
                            handleInput={(e) =>
                                form.setData(
                                    e.target.name,
                                    Math.abs(Math.round(e.target.value))
                                )
                            }
                            formErrorMessage={form.errors.quantity}
                        />
                        <FormInput
                            type="date"
                            formDataValue={form.data.stock_out_date}
                            formErrorMessage={form.errors.stock_out_date}
                            handleChange={onHandleChange}
                            name="stock_out_date"
                            placeholder={"Stock Out Date"}
                        />
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

export default Edit;
