import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const View = (props) => {
    const model = props.model;

    return (
        <Main
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    View Category
                </h2>
            }
        >
            <Head title="View Category" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="py-4 text-2xl font-semibold flex w-full justify-between flex-wrap gap-4">
                        <a
                            href={route("categories.index")}
                            className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </a>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg p-4">
                        <div className="flex flex-col gap-4 p-4">
                            <div className="font-bold text-3xl">
                                ID: {model.id}
                            </div>
                            <div className="font-bold text-3xl">
                                Name: {model.name}
                            </div>
                            <div className="font-bold text-3xl">
                                Description:
                                <p className="border-2 rounded my-4 text-xl font-normal p-4">
                                    {model.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default View;
