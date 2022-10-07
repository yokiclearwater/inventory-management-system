import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const View = (props) => {
    const item = props.item;

    return (
        <Main
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    View Category
                </h2>
            }
        >
            <Head title="View Category" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <a
                            href={route("items.index")}
                            className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </a>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg p-4">
                        <div className="flex flex-col gap-4 p-4">
                            <div className={"flex flex-row flex-wrap justify-between text-indigo-800 font-semibold text-3xl md:text-4xl border-b-2 py-4 border-gray-400"}>
                                <div>Item Detail</div>
                                <div className={`capitalize text-indigo-600 font-semibold`}>{(item.status.type).replace(/_/g, ' ')}</div>
                            </div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>Item ID: {item.id}</div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}><a className={"hover:text-indigo-700 hover:font-semibold"} href={route('products.show', item.product_id)}>Product Name: {item.product.name}</a></div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>Serial Number: {item.serial_no}</div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>Received By: {item.received_by}</div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>Installation Date: {item.installed_date}</div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>Location: {item.location}</div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>Product Location: {item.product_location}</div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>In Stock: {item.in_stock_date}</div>
                            <div className={"md:text-2xl text-xl border-b-2 border-r-2 border-indigo-600 py-4 text-indigo-600"}>Out of Stock: {item.out_of_stock_date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default View;
