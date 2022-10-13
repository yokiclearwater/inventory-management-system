import React from "react";
import {Head, useForm} from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import Button from "@/Components/Button";

const Index = (props) => {
    const [items, setItems] = React.useState(props.items);
    const form = useForm();
    const [exportActive, setExportActive] = React.useState(false);
    const routeList = {
        "show": "items.show",
        "edit": "items.edit",
        "delete": "items.delete",
    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#D22B2B",
        }).then((result) => {
            if (result.isConfirmed) {
                form.delete(route("items.destroy", id), {
                    onSuccess: () => {
                        setItems({
                            ...items,
                            data: items.data.filter((c) => c.id !== id),
                        });
                        Swal.fire("Deleted Successfully", "", "success");
                    },
                    onError: () => Swal.fire("Deleted Error", "", "error"),
                });
            }
        });
    };

    return (
        <Main auth={props.auth} errors={props.errors} title="Items">
            <Head title="Item"/>
            <div className="flex justify-end my-4 w-full h-full">
                <form className="inline-flex items-center space-x-2 max-w-full">
                    <Input
                        handleChange={() => {
                        }}
                        placeholder="Search query"
                        name={"search"}
                        autoComplete={"off"}
                    />
                    <Button className="bg-indigo-600 text-base shadown hover:bg-indigo-700">
                        Search
                    </Button>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow">
                <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <span>Items</span>
                    <a
                        href={route("items.create")}
                        className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white p-2 rounded-md shadow cursor-pointer"
                    >
                        Add New Item
                    </a>
                </div>
                {items.data.length > 0 ? (
                    <>
                        <div className="max-w-full mx-auto">
                            <div className="relative overflow-x-auto">
                                <table className={"text-left w-full table-auto lg:text-xl text-lg"}>
                                    <thead className="bg-indigo-500 text-white">
                                    <tr itemScope={"row"}>
                                        <th className="py-3 px-4" scope="col">
                                            ID
                                        </th>
                                        <th className="py-3 px-4" scope="col">
                                            Name
                                        </th>
                                        <th className="py-3 px-4" scope="col">
                                            Serial No.
                                        </th>
                                        <th className="py-3 px-4" scope="col">
                                            Status
                                        </th>
                                        <th className="py-3 px-4" scope="col">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.data.map((item, index) => {
                                        return (
                                            <tr key={index} className={"even:bg-indigo-200 odd:bg-indigo-100 hover:bg-indigo-300"}>
                                                <th className="py-2 px-4" scope="col">{item.id}</th>
                                                <td className="py-2 px-4 min-w-[300px]" scope="col">{item.product.name}</td>
                                                <td className="py-2 px-4" scope="col">{item.serial_no}</td>
                                                <td className="py-2 px-4 capitalize min-w-[120px]" scope="col">{(item.status.type).replace(/_/g, ' ')}</td>
                                                <td className="py-2 px-4 inline-flex space-x-2 items-center justify-start" scope="col">
                                                    <a
                                                        className="hover:underline cursor-pointer text-green-700 font-semibold"
                                                        href={route('items.show', item.id)}
                                                    >
                                                        View
                                                    </a>
                                                    <a
                                                        className="hover:underline cursor-pointer text-indigo-600 font-semibold"
                                                        href={route('items.edit', item.id)}
                                                    >
                                                        Edit
                                                    </a>
                                                    <a
                                                        className="hover:underline cursor-pointer text-red-600 font-semibold"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full p-4 flex flex-col">
                            <Pagination
                                tables={items}
                                className="p-4 self-center"
                            />
                            <div className="flex flex-col self-end items-end">
                                <button
                                    onClick={() =>
                                        setExportActive(!exportActive)
                                    }
                                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center"
                                    type="button"
                                >
                                    Export
                                    <svg
                                        className="ml-2 w-4 h-4"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>
                                {exportActive && (
                                    <div
                                        className="z-[100] absolute my-14 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                                        <ul
                                            className="py-1 text-gray-700"
                                        >
                                            <li>
                                                <a
                                                    href={route(
                                                        "items.export"
                                                    )}
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Excel
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href={route(
                                                        "items.export",
                                                        "csv"
                                                    )}
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    CSV
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href={route(
                                                        "items.export-pdf"
                                                    )}
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    PDF
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="max-w-full mx-auto flex items-center justify-center p-4">
                            <div className="p-4 my-8 text-4xl text-red-500 font-semibold ">
                                No Items Found!!
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Main>
    );
};

export default Index;
