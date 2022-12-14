import React, { useEffect, useState } from "react";
import {Head, useForm} from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import Select from "@/Components/Select";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagination";

export default function UpdateUserRole(props) {
    const [openedModal, setOpenedModal] = React.useState(false);
    const initialFormData = {
        user_data: null,
        role_id: "",
    };

    const form = useForm(initialFormData);

    const changeRole = (event) => {
        form.setData("role_id", event.target.value);
    };

    const updateSuccess = () => {
        form.reset();
        setOpenedModal(false);
        Swal.fire('Updated Successfully', '', 'success');
    }

    const submitForm = (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure you want to edit this brand?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            confirmButtonColor: 'orange',
        }).then((result) => {
            if(result.isConfirmed) {
                form.put(route("roles.update_user_role"), {
                    onSuccess: () => updateSuccess(),
                    onError: () => Swal.fire('Updated Error', '', 'error'),
                });
            }
        });
    }

    return (
        <>
            {openedModal && <Modal className={"rounded-lg shadow"}>
                <form className="p-4 flex gap-4 flex-col" onSubmit={submitForm}>
                    <div className="text-blue-800 text-2xl font-semibold w-full border-b-blue-800 border-b-2 py-2">
                        Edit Role
                    </div>
                    <Select
                        value={form.data.role_id}
                        handleChange={changeRole}
                        name={"role_id"}
                        className="capitalize w-full"
                    >
                        {props.roles.data.map(role => {
                            return <option key={role.id} value={role.id}>{role.name.toUpperCase().replaceAll('_', ' ')}</option>
                        })}
                    </Select>
                    <div className="inline-flex space-x-2 self-end">
                        <Button
                            type={"button"}
                            handleClick={() => {
                                form.reset();
                                setOpenedModal(false);
                            }}
                            className="!text-lg w-fit bg-gray-300 !text-gray-700 hover:bg-gray-400 hover:!text-gray-200 rounded font-semibold shadow"
                        >
                            Cancel
                        </Button>
                        <Button className="!text-lg w-fit bg-blue-500 !text-gray-100 hover:bg-blue-700 hover:!text-gray-200 rounded font-semibold shadow">
                            Apply
                        </Button>
                    </div>
                </form>
            </Modal>}
            <Main auth={props.auth} errors={props.errors} title={"Roles"}>
                <Head title="Roles" />

                <div className="bg-white rounded-xl shadow">
                    <div className="max-w-full mx-auto">
                        <div className="p-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                            <span>Edit User Roles</span>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="text-left w-full table-auto lg:text-xl text-lg">
                                <thead className="bg-blue-700 text-white">
                                <tr itemScope={"row"}>
                                    <th className="py-3 px-4" scope="col">
                                        User ID
                                    </th>
                                    <th className="py-3 px-4" scope="col">
                                        Username
                                    </th>
                                    <th className="py-3 px-4" scope="col">
                                        E-Mail
                                    </th>
                                    <th className="py-3 px-4" scope="col">
                                        Role
                                    </th>
                                    <th className="py-3 px-4" scope="col">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {props.users.map((user, index) => {
                                    return (
                                        <tr key={user.id} className={
                                            "even:bg-blue-200 odd:bg-blue-100 hover:bg-blue-300"
                                        }>
                                            <th className={"py-3 px-4"}>
                                                {user.id}
                                            </th>
                                            <td className={"py-3 px-4"}>
                                                {user.name}
                                            </td>
                                            <td className={"py-3 px-4"}>
                                                {user.email}
                                            </td>
                                            <td className={"py-3 px-4"}>
                                                {user.role.name.toUpperCase().replaceAll('_', ' ')}
                                            </td>
                                            <td className={"py-3 px-4"}>
                                                <a onClick={() => {
                                                    const data = {
                                                        user_data: user,
                                                        role_id: user.role_id,
                                                    };
                                                    form.setData(data);
                                                    setOpenedModal(true);
                                                }} className="hover:underline cursor-pointer text-blue-600 font-semibold">Edit</a>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full flex items-center justify-center py-4">
                            <Pagination
                                tables={props.roles}
                                className="p-4 self-center"
                            />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}
