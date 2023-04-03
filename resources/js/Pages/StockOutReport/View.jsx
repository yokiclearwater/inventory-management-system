import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faPrint } from "@fortawesome/free-solid-svg-icons";
import ReactToPrint from 'react-to-print';

const View = (props) => {
    const item = props.item;
    const stockOutReport = props.stockOutReport;
    const componentRef = React.useRef();

    return (
        <Main auth={props.auth} errors={props.errors} title="Stock Out Reports">
            <Head title="View Stock Out Report" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <a
                            href={route("stock-out-reports.index")}
                            className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </a>
                        <ReactToPrint
                            trigger={() => <button className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer">
                                <FontAwesomeIcon icon={faPrint} /> Print
                            </button>}
                            content={() => componentRef.current}
                        >
                            Print
                        </ReactToPrint>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-4" ref={componentRef}>
                        <div className="flex flex-col gap-4 p-4">
                            <div
                                className={
                                    "flex flex-row flex-wrap justify-between text-blue-800 font-semibold text-3xl md:text-4xl border-b-2 py-4 border-gray-400"
                                }
                            >
                                <div>Stock Out Report Detail</div>
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
                                Stock Out Quantity: {stockOutReport.quantity}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Receiver: {stockOutReport.received_by}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Issuer: {stockOutReport.issued_by}
                            </div>
                            <div
                                className={
                                    "md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600"
                                }
                            >
                                Stock Out Date: {stockOutReport.stock_out_date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default View;
