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
    const stockOutReport = props.stockOutReport;

    const form = useForm({
        received_by: stockOutReport.received_by,
        issued_by: stockOutReport.issued_by,
        quantity: stockOutReport.quantity,
        stock_out_date: stockOutReport.stock_out_date,
    });

    const [item, setItem] = useState(props.item);

    const onHandleChange = (event) => {
        form.setData(event.target.name, event.target.value);
    };

    const submitSuccess = () => {
        Swal.fire("Added Successfully", "", "success");
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();

        form.put(route("stock-out-reports.update", stockOutReport.id), {
            onSuccess: () => submitSuccess(),
        });
    };

    return (
        <Main auth={props.auth} title="Edit Stock Out Report">
            <Head title="Edit Stock Out Report" />

            <div className="max-w-full m-auto">
                <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <a
                        href={route("stock-out-reports.index")}
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
                        <FormInput
                            formDataValue={props.product.name}
                            handleChange={() => {}}
                            placeholder={"Item Name"}
                            readOnly={true}
                        />
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
                            handleChange={() => {}}
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
