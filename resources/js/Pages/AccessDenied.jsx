import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";

export default function AccessDenied(props) {
    console.log(props.isAuth);

    return (
        <>
            <Head title="Accessed Denied" />
            {props.flash.message && (
                <div className="alert p-4 text-2xl font-semibold text-red-500  italic">
                    {props.flash.message}
                </div>
            )}
            <Guest>
                <div className="text-2xl">
                    <div className={"text-3xl bg-red-500 w-fit p-2 text-white rounded-lg shadow"}>Access Denied</div>
                    <div className={"py-4"}>⛔ You don't have permission to perform this action.</div>
                </div>
            </Guest>
        </>
    );
}
