import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Select from "@/Components/Select";
import Label from "@/Components/Label";

const Index = (props) => {
    const [items, setItems] = React.useState(props.items);
    const form = useForm();
    const [exportActive, setExportActive] = React.useState(false);
    const routeList = {
        show: "items.show",
        edit: "items.edit",
        delete: "items.delete",
    };
    const [modalOpened, setModalOpened] = React.useState(false);

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

    const handleFilterForm = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.get(route("items.index"));
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
                                                // value={category.name}
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
                                                // value={brand.name}
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
            <Main auth={props.auth} errors={props.errors} title="Items">
                <Head title="Item" />
                <div className="flex justify-end my-4 w-full h-full gap-2 flex-wrap">
                    <form
                        className="inline-flex items-center space-x-2 max-w-full"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            handleChange={handleFilterForm}
                            placeholder="Search Product Name"
                            name={"search"}
                            autoComplete={"off"}
                        />
                        <Button className="bg-blue-600 text-base shadow hover:bg-blue-700">
                            Search
                        </Button>
                    </form>
                    <Button
                        type={"button"}
                        handleClick={() => setModalOpened(true)}
                        className="bg-blue-600 text-base shadow hover:bg-blue-700"
                    >
                        Filter
                    </Button>
                </div>
                <div className="bg-white rounded-xl shadow">
                    <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <span>Items</span>
                        {props.can.create && (
                            <a
                                href={route("items.create")}
                                className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow cursor-pointer"
                            >
                                Add New Item
                            </a>
                        )}
                    </div>
                    {items.data.length > 0 ? (
                        <>
                            <div className="max-w-full mx-auto">
                                <div className="relative overflow-x-auto">
                                    <table
                                        className={
                                            "text-left w-full table-auto lg:text-xl text-lg"
                                        }
                                    >
                                        <thead className="bg-blue-600 text-white">
                                            <tr itemScope={"row"}>
                                                <th
                                                    className="py-3 px-4"
                                                    scope="col"
                                                >
                                                    ID
                                                </th>
                                                <th
                                                    className="py-3 px-4"
                                                    scope="col"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    className="py-3 px-4"
                                                    scope="col"
                                                >
                                                    Unit
                                                </th>
                                                <th
                                                    className="py-3 px-4"
                                                    scope="col"
                                                >
                                                    Quantity
                                                </th>
                                                <th
                                                    className="py-3 px-4"
                                                    scope="col"
                                                >
                                                    Location
                                                </th>
                                                <th
                                                    className="py-3 px-4"
                                                    scope="col"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    className="py-3 px-4"
                                                    scope="col"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.data.map((item, index) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className={
                                                            "even:bg-blue-200 odd:bg-blue-100 hover:bg-blue-300"
                                                        }
                                                    >
                                                        <th
                                                            className="py-2 px-4"
                                                            scope="col"
                                                        >
                                                            {item.id}
                                                        </th>
                                                        <td
                                                            className="py-2 px-4 min-w-[300px]"
                                                            scope="col"
                                                        >
                                                            {item.product.name}
                                                        </td>
                                                        <td
                                                            className="py-2 px-4"
                                                            scope="col"
                                                        >
                                                            {item.unit && item.unit.name.toUpperCase()}
                                                        </td>
                                                        <td
                                                            className="py-2 px-4"
                                                            scope="col"
                                                        >
                                                            {item.quantity}
                                                        </td>
                                                        <td
                                                            className="py-2 px-4"
                                                            scope="col"
                                                        >
                                                            {item.location && `${item.location.product_location}, ${item.location.inventory_location}`}
                                                        </td>
                                                        <td
                                                            className="py-2 px-4 capitalize min-w-[120px]"
                                                            scope="col"
                                                        >
                                                            {item.status && item.status.type.replace(
                                                                /_/g,
                                                                " "
                                                            )}
                                                        </td>
                                                        <td
                                                            className="py-2 px-4 inline-flex space-x-2 items-center justify-start"
                                                            scope="col"
                                                        >
                                                            {props.can.view && (
                                                                <a
                                                                    className="hover:underline cursor-pointer text-green-700 font-semibold"
                                                                    href={route(
                                                                        "items.show",
                                                                        item.id
                                                                    )}
                                                                >
                                                                    View
                                                                </a>
                                                            )}
                                                            {props.can
                                                                .update && (
                                                                <a
                                                                    className="hover:underline cursor-pointer text-blue-600 font-semibold"
                                                                    href={route(
                                                                        "items.edit",
                                                                        item.id
                                                                    )}
                                                                >
                                                                    Edit
                                                                </a>
                                                            )}
                                                            {(props.can.delete) &&
                                                                <a
                                                                    className="hover:underline cursor-pointer text-red-600 font-semibold"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </a>
                                                            }
                                                        </td>
                                                    </tr>
                                                );
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
        </>
    );
};

export default Index;
