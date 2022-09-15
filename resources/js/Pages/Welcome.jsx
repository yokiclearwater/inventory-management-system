import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";

export default function Welcome(props) {
    console.log(props.isAuth);

    return (
        <>
            <Head title="Welcome" />
            {props.flash.message && (
                <div className="alert p-4 text-2xl font-semibold text-red-500  italic">
                    {props.flash.message}
                </div>
            )}
            <Guest>
                <div className="text-2xl">
                    <div className="text-3xl font-bold">Welcome 👋</div>
                    <div>To Inventory Management System</div>
                    <div className="inline-flex gap-4 my-4 text-blue-700">
                        {props.isAuth ? (
                            <>
                                <a
                                    className="hover:bg-blue-500 hover:text-white bg-white p-3 rounded-lg"
                                    href={route("dashboard")}
                                >
                                    Go To Dashboard
                                </a>
                            </>
                        ) : (
                            <>
                                <a
                                    className="hover:underline"
                                    href={route("login")}
                                >
                                    Login
                                </a>
                                <a
                                    className="hover:underline"
                                    href={route("register")}
                                >
                                    Register
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </Guest>
        </>
    );
}
