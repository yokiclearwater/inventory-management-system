import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import Label from "@/Components/Label";
import Select from "@/Components/Select";

const Index = (props) => {
    const [products, setProducts] = useState(props.products);
    const form = useForm();
    const [exportActive, setExportActive] = useState(false);
    const routeList = {
        show: "products.show",
        edit: "products.edit",
        delete: "products.delete",
    };

    const [modalOpened, setModalOpened] = useState(false);

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

    const handleFilterForm = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.get(route("products.index"));
    };

    return (
        <>
            {modalOpened && (
                <Modal className={"rounded-lg"}>
                    <div className="p-4 flex gap-4 flex-col">
                        <div className="text-blue-800 text-2xl font-semibold w-full border-b-blue-800 border-b-2 py-2">
                            Filter
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"flex flex-col gap-4"}>
                                <Label
                                    className={
                                        "font-semibold !text-xl border-b-2 py-2"
                                    }
                                >
                                    Product Category
                                </Label>
                                <Select
                                    defaultValue={""}
                                    value={form.data.category}
                                    handleChange={handleFilterForm}
                                    name={"category"}
                                    className="capitalize py-2 w-full"
                                >
                                    <option value={""} disabled={true}>
                                        Select A Category
                                    </option>
                                    {props.categories.map((category) => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.name}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div className={"flex flex-col gap-4"}>
                                <Label
                                    className={
                                        "font-semibold !text-xl border-b-2 py-2"
                                    }
                                >
                                    Product Model
                                </Label>
                                <Select
                                    defaultValue={""}
                                    value={form.data.model}
                                    handleChange={handleFilterForm}
                                    name={"model"}
                                    className="capitalize py-2 w-full"
                                >
                                    <option value={""} disabled={true}>
                                        Select A Model
                                    </option>
                                    {props.models.map((model) => {
                                        return (
                                            <option
                                                key={model.id}
                                                value={model.name}
                                            >
                                                {model.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div className={"flex flex-col gap-4"}>
                                <Label
                                    className={
                                        "font-semibold !text-xl border-b-2 py-2"
                                    }
                                >
                                    Product Model
                                </Label>
                                <Select
                                    defaultValue={""}
                                    value={form.data.brand}
                                    handleChange={handleFilterForm}
                                    name={"brand"}
                                    className="capitalize py-2 w-full"
                                >
                                    <option value={""} disabled={true}>
                                        Select A Brand
                                    </option>
                                    {props.brands.map((brand) => {
                                        return (
                                            <option
                                                key={brand.id}
                                                value={brand.name}
                                            >
                                                {brand.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className="inline-flex space-x-2 self-end">
                            <Button
                                type={"button"}
                                handleClick={() => {
                                    form.reset();
                                    setModalOpened(false);
                                }}
                                className="!text-lg w-fit bg-gray-300 !text-gray-700 hover:bg-gray-400 hover:!text-gray-200 rounded font-semibold shadow"
                            >
                                Reset
                            </Button>
                            <Button
                                handleClick={() => setModalOpened(false)}
                                className="!text-lg w-fit bg-blue-500 !text-gray-100 hover:bg-blue-700 hover:!text-gray-200 rounded font-semibold shadow"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
            <Main auth={props.auth} errors={props.errors} title="Products">
                <Head title="Products" />
                <div className="flex justify-end my-4 w-full h-full">
                    <form
                        className="inline-flex products-center space-x-2 max-w-full"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            handleChange={handleFilterForm}
                            placeholder="Search Name"
                            name={"search"}
                            autoComplete={"off"}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Button className="bg-blue-600 text-base shadow hover:bg-blue-700">
                                Search
                            </Button>
                            <Button
                                type={"button"}
                                handleClick={() => setModalOpened(true)}
                                className="bg-blue-600 text-base shadow hover:bg-blue-700"
                            >
                                Filter
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="bg-white rounded-xl shadow">
                    <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <span>Products</span>
                        {props.can.create && (
                            <a
                                href={route("products.create")}
                                className="bg-blue-600 text-xl hover:bg-blue-700 text-white p-2 rounded-md shadow cursor-pointer"
                            >
                                Add New Products
                            </a>
                        )}
                    </div>
                    {products.data.length > 0 ? (
                        <>
                            <div className="max-w-full mx-auto">
                                <div className="relative overflow-x-auto">
                                    <Table
                                        tables={props.products}
                                        handleDelete={handleDelete}
                                        routeList={routeList}
                                        can={props.can}
                                    />
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
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center"
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
                                        <div className="z-[100] absolute my-14 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                                            <ul className="py-1 text-gray-700">
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
        </>
    );
};

export default Index;
