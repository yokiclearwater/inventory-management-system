import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const View = (props) => {
    const item = props.item;

    return (
        <Main auth={props.auth} errors={props.errors} title="Items">
            <Head title="View Item" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <a
                            href={route("items.index")}
                            className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </a>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-4">
                        <div className="flex flex-col gap-4 p-4">
                            <div
                                className={
                                    "flex flex-row flex-wrap justify-between text-blue-800 font-semibold text-3xl md:text-4xl border-b-2 py-4 border-gray-400"
                                }
                            >
                                <div>Item Detail</div>
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Item ID: {item.id}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Item Code: {item.item_code}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                <a
                                    className={
                                        "hover:text-blue-700 hover:font-semibold"
                                    }
                                    href={route(
                                        "products.show",
                                        item.product_id
                                    )}
                                >
                                    Product Name: {item.product.name}
                                </a>
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Part Number: {item.part_number}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Unit:{" "}
                                {item.unit.name && item.unit.name.toUpperCase()}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Quantity: {item.quantity}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Received By: {item.received_by}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Issued By: {item.issued_by}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                <a
                                    className={
                                        "hover:text-blue-700 hover:font-semibold"
                                    }
                                    href={item.location && route(
                                        "locations.show",
                                        item.location_id
                                    )}
                                >
                                    Location:{" "}
                                    {item.location &&
                                        `${item.location.product_location}, ${item.location.inventory_location}`}
                                </a>
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                In Stock: {item.in_stock_date}
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                Description:
                                <p className="py-4 px-2">{item.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default View;
