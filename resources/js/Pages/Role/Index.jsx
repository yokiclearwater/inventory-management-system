import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Table from "@/Components/Table";

const Index = (props) => {
    const [roles, setRoles] = React.useState(props.roles);
    const form = useForm();
    const routeList = {
        show: "roles.show",
        edit: "roles.edit",
        delete: "roles.delete",
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#D22B2B",
        }).then((result) => {
            if (result.isConfirmed) {
                form.delete(route("roles.destroy", id), {
                    onSuccess: () => {
                        setRoles({
                            ...roles,
                            data: roles.data.filter((c) => c.id !== id),
                        });
                        Swal.fire("Deleted Successfully", "", "success");
                    },
                    onError: () => Swal.fire("Deleted Error", "", "error"),
                });
            }
        });
    };

    return (
        <Main auth={props.auth} errors={props.errors} title="Roles">
            <Head title="Role" />
            <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow">
                    <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <span>Roles</span>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={route("roles.create")}
                                className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow cursor-pointer"
                            >
                                Add New Role
                            </a>
                            <a
                                href={route("roles.edit_user_role")}
                                className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-3 rounded-md shadow cursor-pointer"
                            >
                                Edit User Role
                            </a>
                        </div>
                    </div>
                    {roles.data.length > 0 ? (
                        <>
                            <div className="max-w-full mx-auto">
                                <div className="relative overflow-x-auto">
                                    <Table
                                        tables={props.roles}
                                        handleDelete={handleDelete}
                                        routeList={routeList}
                                    />
                                </div>
                            </div>
                            <div className="w-full p-4 flex flex-col">
                                <Pagination
                                    tables={roles}
                                    className="p-4 self-center"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-w-full mx-auto flex items-center justify-center p-4">
                                <div className="p-4 my-8 text-4xl text-red-500 font-semibold ">
                                    No Roles Found!!!
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="bg-white rounded-xl shadow">
                    <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <span>Restricted/Default Roles</span>
                    </div>
                    {props.restricted_roles.data.length > 0 ? (
                        <>
                            <div className="max-w-full mx-auto">
                                <div className="relative overflow-x-auto">
                                    <RestrictedRoleTable
                                        restricted_roles={
                                            props.restricted_roles
                                        }
                                        showRoute={"roles.show"}
                                    />
                                </div>
                            </div>
                            <div className="w-full p-4 flex flex-col">
                                <Pagination
                                    tables={props.restricted_roles}
                                    className="p-4 self-center"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-w-full mx-auto flex items-center justify-center p-4">
                                <div className="p-4 my-8 text-4xl text-red-500 font-semibold ">
                                    No Roles Found!!!
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Main>
    );
};

const RestrictedRoleTable = (props) => {
    return (
        <table className="text-left w-full table-auto lg:text-xl text-lg">
            <thead className="bg-blue-600 text-white">
                <tr itemScope={"row"}>
                    <th className="py-3 px-4" scope="col">
                        ID
                    </th>
                    <th className="py-3 px-4" scope="col">
                        Name
                    </th>
                    <th className="py-3 px-4" scope="col">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.restricted_roles.data.map((datum, index) => {
                    return (
                        <tr
                            className={`even:bg-blue-200 odd:bg-blue-100 hover:bg-blue-300`}
                            itemScope={"row"}
                            key={index}
                        >
                            <th className="py-2 px-4" scope="col">
                                {datum.id}
                            </th>
                            <td className="py-2 px-4 capitalize" scope="col">
                                {datum.name.replaceAll("_", " ")}
                            </td>
                            <td
                                className="py-2 px-4 inline-flex space-x-2 items-center justify-start"
                                scope="col"
                            >
                                {
                                    <a
                                        className="hover:underline cursor-pointer text-green-700 font-semibold"
                                        href={route(props.showRoute, {
                                            id: datum.id,
                                        })}
                                    >
                                        View
                                    </a>
                                }
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Index;
