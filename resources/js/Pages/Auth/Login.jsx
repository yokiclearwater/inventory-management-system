import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div>
                <div className="flex flex-col gap-2 my-4">
                    <div className="text-3xl font-bold">Sign In</div>
                    <div>Enter your email and password to sign in</div>
                </div>
                <form onSubmit={submit}>
                    <div>
                        <Label forInput="email" value="Email" />

                        <Input
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password" value="Password" />

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                handleChange={onHandleChange}
                            />
                            <span className="ml-2 text-base text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="my-4 text-center">
                        <Button
                            className="flex items-center justify-center w-full text-center bg-blue-700 hover:bg-blue-800 md:!text-lg text-sm"
                            processing={processing}
                        >
                            Log in
                        </Button>
                    </div>
                    <div className="flex justify-between">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="italic hover:underline md:!text-lg text-sm text-blue-600 hover:text-blue-900"
                            >
                                Forgot your password?
                            </Link>
                        )}
                        <Link
                            href={route("register")}
                            className="italic hover:underline md:!text-lg text-sm text-blue-600 hover:text-blue-900"
                        >
                            Don't have an account yet?
                        </Link>
                    </div>
                </form>
            </div>
        </Guest>
    );
}
