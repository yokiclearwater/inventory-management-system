import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const View = (props) => {
    const role = props.role;

    return (
        <Main auth={props.auth} errors={props.errors} title={"Categories"}>
            <Head title="View Role" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <a
                            href={route("roles.index")}
                            className="bg-blue-600 text-xl hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </a>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg p-4">
                        <div className="flex flex-col gap-4 p-4">
                            <div
                                className={
                                    "flex flex-row flex-wrap justify-between text-blue-800 font-semibold text-3xl md:text-4xl border-b-2 py-4 border-gray-400"
                                }
                            >
                                <div>Role Detail</div>
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                ID: {role.id}
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                Name: {role.name.toUpperCase()}
                            </div>
                            <div className="md:text-2xl text-xl border-b-2 border-r-2 border-blue-600 py-4 text-blue-600">
                                Permissions:
                                <div className="flex flex-wrap gap-2 px-2 py-4">
                                    {role.permissions.map(permission => (<div key={permission.id} className="capitalize bg-blue-500 py-2 px-4 rounded-md text-white shadow">{permission.type}</div>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default View;
