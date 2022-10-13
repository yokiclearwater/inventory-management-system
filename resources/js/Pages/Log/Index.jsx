import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import Select from "@/Components/Select";

const Log = (props) => {
    const [modalOpened, setModalOpened] = React.useState(false);
    const form = useForm({
        type: "",
        event: "",
    });

    const onHandleChange = (e) => {
        form.setData(e.target.name, e.target.value);
    };


    return (
        <>
            {modalOpened && (
                <Modal className={"rounded-lg"}>
                    <form className="p-4 flex gap-4 flex-col">
                        <div className="text-indigo-800 text-2xl font-semibold w-full border-b-violet-800 border-b-2 py-2">
                            Filter
                        </div>
                        <Select
                            value={form.data.type}
                            handleChange={onHandleChange}
                            name={"type"}
                            className="capitalize"
                        >
                            <option disabled value={""}>
                                Select a model type
                            </option>
                            {props.auditable_types.map((type, index) => (
                                <option key={index}>
                                    {type.auditable_type}
                                </option>
                            ))}
                        </Select>
                        <Select
                            value={form.data.event}
                            handleChange={onHandleChange}
                            name={"event"}
                            className="capitalize"
                        >
                            <option disabled value={""}>
                                Select a model event
                            </option>
                            {props.events.map((data, index) => (
                                <option key={index}>{data.event}</option>
                            ))}
                        </Select>
                        <div className="inline-flex space-x-2 self-end">
                            <Button
                                handleClick={() => setModalOpened(!modalOpened)}
                                className="!text-lg w-fit bg-gray-300 !text-gray-700 hover:bg-gray-400 hover:!text-gray-200 rounded font-semibold shadow"
                            >
                                Cancel
                            </Button>
                            <Button className="!text-lg w-fit bg-violet-500 !text-gray-100 hover:bg-violet-700 hover:!text-gray-200 rounded font-semibold shadow">
                                Apply
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
            <Main auth={props.auth} errors={props.errors} title="Audit Logs">
                <Head title="Logs" />
                <div className="flex justify-end my-4 w-full h-full">
                    <Button
                        type="button"
                        handleClick={() => setModalOpened(!modalOpened)}
                        className="bg-indigo-600 text-base shadown hover:bg-indigo-700"
                    >
                        Filter
                    </Button>
                </div>
                <div className="bg-white rounded-xl shadow">
                    <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <span>Audit Logs</span>
                    </div>
                    <div className="max-w-full mx-auto">
                        <div className="relative overflow-x-auto">
                            <table className="text-center w-full table-auto lg:text-xl text-lg">
                                <thead className="bg-indigo-500 text-white">
                                    <tr>
                                        <th className="py-2 px-4">#</th>
                                        <th className="py-2 px-4">User ID</th>
                                        <th className="py-2 px-4">Events</th>
                                        <th className="py-2 px-4">
                                            Model Type
                                        </th>
                                        <th className="py-2 px-4">Model ID</th>
                                        <th className="py-2 px-4">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.audits.data.map((audit, index) => (
                                        <tr key={audit.id} className={`${(index % 2 ? "bg-indigo-100" : "bg-indigo-200")} hover:bg-indigo-300`}>
                                            <td className="py-3 px-4">
                                                {audit.id}
                                            </td>
                                            <td className="py-2 px-4">
                                                {audit.user_id}
                                            </td>
                                            <td className="py-2 px-4 capitalize">
                                                {audit.event}
                                            </td>
                                            <td className="py-2 px-4">
                                                {audit.auditable_type}
                                            </td>
                                            <td className="py-2 px-4">
                                                {audit.auditable_id}
                                            </td>
                                            <td className="py-2 px-4">
                                                <a
                                                    href={route("logs.show", {
                                                        id: audit.id,
                                                    })}
                                                    className="hover:underline text-blue-500 font-semibold"
                                                >
                                                    View Detail
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full flex items-center justify-center py-4">
                            <Pagination
                                tables={props.audits}
                                className="p-4 self-center"
                            />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
};

export default Log;
