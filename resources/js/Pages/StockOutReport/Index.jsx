import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import Button from "@/Components/Button";

const Index = (props) => {
    const [stockOutReports, setStockOutReports] = React.useState(
        props.stockOutReports
    );
    const form = useForm();

    const routeList = {
        show: "stock-out-reports.show",
        edit: "stock-out-reports.edit",
        delete: "stock-out-reports.delete",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.get(route("stock-out-reports.index"));
    };

    const handleChange = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <Main auth={props.auth} errors={props.errors} title="Stock Out Reports">
            <Head title="Stock Out Reports" />
            <div className="flex justify-end my-4 w-full h-full">
                <form
                    onSubmit={handleSubmit}
                    className="inline-flex items-center space-x-2 max-w-full"
                >
                    <Input
                        handleChange={handleChange}
                        placeholder="Search Name"
                        name={"search"}
                        autoComplete={"off"}
                    />
                    <Button className="bg-blue-600 text-base shadow hover:bg-blue-700">
                        Search
                    </Button>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow">
                <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <span>Stock Out Reports</span>
                    {props.can.create && (
                        <a
                            href={route("stock-out-reports.create")}
                            className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow cursor-pointer"
                        >
                            Add New Stock Out Report
                        </a>
                    )}
                </div>
                {stockOutReports.data.length > 0 ? (
                    <>
                        <div className="max-w-full mx-auto">
                            <div className="relative overflow-x-auto">
                                <Table tables={stockOutReports} routeList={routeList} can={props.can} />
                            </div>
                        </div>
                        <div className="w-full p-4 flex flex-col">
                            <Pagination
                                tables={stockOutReports}
                                className="p-4 self-center"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="max-w-full mx-auto flex items-center justify-center p-4">
                            <div className="p-4 my-8 text-4xl text-red-500 font-semibold ">
                                No Stock Out Reports Found!!
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Main>
    );
};

export default Index;

const Table = ({ tables, routeList, can }) => {
    return (
        <table className="text-left w-full table-auto lg:text-xl text-lg">
            <thead className="bg-blue-600 text-white">
                <tr itemScope={"row"}>
                    <th className="py-3 px-4" scope="col">
                        ID
                    </th>
                    <th className="py-3 px-4" scope="col">
                        Item Name
                    </th>
                    <th className="py-3 px-4" scope="col">
                        Part Number
                    </th>
                    <th className="py-3 px-4" scope="col">
                        Stock Out Quantity
                    </th>
                    <th className="py-3 px-4" scope="col">
                        Date
                    </th>
                    <th className="py-3 px-4" scope="col">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {tables.data.map((table, index) => {
                    return (
                        <tr
                            className={`even:bg-blue-200 odd:bg-blue-100 hover:bg-blue-300`}
                            itemScope={"row"}
                            key={index}
                        >
                            <th className="py-2 px-4" scope="col">
                                {table.id}
                            </th>
                            <td className="py-2 px-4 capitalize" scope="col">
                                {table.item.product.name}
                            </td>
                            <td className="py-2 px-4 capitalize" scope="col">
                                {table.item.part_number}
                            </td>
                            <td className="py-2 px-4 capitalize" scope="col">
                                {table.quantity}
                            </td>
                            <td className="py-2 px-4 capitalize" scope="col">
                                {table.stock_out_date}
                            </td>
                            <td
                                className="py-2 px-4 inline-flex space-x-2 items-center justify-start"
                                scope="col"
                            >
                                {can.view && (
                                    <a
                                        className="hover:underline cursor-pointer text-green-700 font-semibold"
                                        href={route(routeList.show, {
                                            id: table.id,
                                        })}
                                    >
                                        View
                                    </a>
                                )}
                                {can.update && (
                                    <a
                                        className="hover:underline cursor-pointer text-blue-600 font-semibold"
                                        href={route(routeList.edit, {
                                            id: table.id,
                                        })}
                                    >
                                        Edit
                                    </a>
                                )}
                                {can.delete && (
                                    <a
                                        className="hover:underline cursor-pointer text-red-600 font-semibold"
                                        onClick={() => handleDelete(table.id)}
                                    >
                                        Delete
                                    </a>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
