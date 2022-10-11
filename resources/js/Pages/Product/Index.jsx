import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Table from "@/Components/Table";

const Index = (props) => {
    const [products, setProducts] = React.useState(props.products);
    const form = useForm();
    const [exportActive, setExportActive] = React.useState(false);
    const routeList = {
        "show": "products.show",
        "edit": "products.edit",
        "delete": "products.delete",
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#D22B2B",
        }).then((result) => {
            if (result.isConfirmed) {
                form.delete(route("products.destroy", id), {
                    onSuccess: () => {
                        setProducts({
                            ...products,
                            data: products.data.filter((c) => c.id !== id),
                        });
                        Swal.fire("Deleted Successfully", "", "success");
                    },
                    onError: () => Swal.fire("Deleted Error", "", "error"),
                });
            }
        });
    };

    return (
        <Main auth={props.auth} errors={props.errors} title="Products">
            <Head title="Products" />
            <div className="flex justify-end my-4 w-full h-full">
                <form  className="inline-flex products-center space-x-2 max-w-full">
                    <Input
                        handleChange={() => {}}
                        placeholder="Search query"
                        name={"search"}
                        autoComplete={"off"}
                    />
                    <Button className="bg-indigo-600 text-base shadow hover:bg-indigo-700">
                        Search
                    </Button>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow">
                <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                    <span>Products</span>
                    <a
                        href={route("products.create")}
                        className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white p-2 rounded-md shadow cursor-pointer"
                    >
                        Add New Products
                    </a>
                </div>
                {products.data.length > 0 ? (
                    <>
                        <div className="max-w-full mx-auto">
                            <div className="relative overflow-x-auto">
                                <Table tables={props.products} handleDelete={handleDelete} routeList={routeList} />
                            </div>
                        </div>
                        <div className="w-full p-4 flex flex-col">
                            <Pagination
                                tables={products}
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
                                                        "products.export"
                                                    )}
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Excel
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href={route(
                                                        "products.export",
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
                                                        "products.export-pdf"
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
                        <div className="max-w-full mx-auto flex products-center justify-center p-4">
                            <div className="p-4 my-8 text-4xl text-red-500 font-semibold">
                                No Products Found!!
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Main>
    );
};

export default Index;