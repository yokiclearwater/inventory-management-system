import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const View = (props) => {
    const audit = props.audit;

    return (
        <Main
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    View Brand
                </h2>
            }
        >
            <Head title="View Audit Log" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <a
                            href={route("logs.index")}
                            className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </a>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg p-4">
                        <div className="flex flex-col gap-4 p-4">
                            <div className="flex flex-row gap-2 flex-wrap justify-between items-center">
                                <h2 className="font-bold md:text-3xl text-2xl">
                                    ID :{" "}
                                    {
                                        <span className="font-normal">
                                            {audit.id}
                                        </span>
                                    }
                                </h2>
                                <span className="bg-indigo-500 text-white p-2 font-semibold capitalize rounded shadow text-2xl">{audit.event} Event</span>
                            </div>
                            <div className="flex flex-col gap-2 flex-wrap">
                                <h2 className="font-bold md:text-3xl text-2xl">
                                    Username :{" "}
                                    {
                                        <span className="font-normal">
                                            {audit.user.name}
                                        </span>
                                    }
                                </h2>
                            </div>
                            <div className="flex flex-col gap-2 flex-wrap">
                                <h2 className="font-bold md:text-3xl text-2xl">
                                    Model ID :{" "}
                                    {
                                        <span className="font-normal">
                                            {audit.auditable_id}
                                        </span>
                                    }
                                </h2>
                            </div>
                            <div className="flex flex-col gap-2 flex-wrap">
                                <h2 className="font-bold md:text-3xl text-2xl">
                                    Model Type :{" "}
                                    {
                                        <span className="font-normal">
                                            {audit.auditable_type}
                                        </span>
                                    }
                                </h2>
                            </div>
                            <div className="flex flex-col gap-2 flex-wrap">
                                <h2 className="font-bold md:text-3xl text-2xl">
                                    View URL :{" "}
                                    {
                                        <a href={audit.url} className="font-normal text-indigo-500 hover:underline hover:text-indigo-700 cursor-pointer md:text-3xl text-lg">
                                            {audit.url}
                                        </a>
                                    }
                                </h2>
                            </div>
                            <div className="flex flex-col gap-2 flex-wrap">
                                <h2 className="font-bold md:text-3xl text-2xl">
                                    Old Values :
                                </h2>
                                <pre className="bg-indigo-800 text-white shadow rounded p-4 text-xl md:text-2xl">
                                    {JSON.stringify(audit.old_values, null, 2)}
                                </pre>
                            </div>
                            <div className="flex flex-col gap-2 flex-wrap">
                                <h2 className="font-bold md:text-3xl text-2xl">
                                    New Values :
                                </h2>
                                <pre className="bg-indigo-800 text-white shadow rounded p-4 text-xl md:text-2xl">
                                    {JSON.stringify(audit.new_values, null, 2)}
                                </pre>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Main>
    );
};

export default View;
