import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import Main from "@/Layouts/Main";
import Card from "@/Components/Card";
import {
    faBoxArchive, faClock,
    faComputerMouse,
    faCopyright,
    faLayerGroup,
    faPeopleGroup,
    faReceipt,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard(props) {
    const roleName = props.role.name.replace("_", " ").toUpperCase();

    return (
        <Main auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <div className="p-4 flex flex-col gap-4">
                <div className="bg-white rounded p-4 shadow">
                    <div className="md:text-4xl text-2xl">
                        Welcome Back,{" "}
                        <span className="text-blue-700 font-bold">
                            {props.user.name}
                        </span>
                    </div>
                    <div className="w-fit px-4 my-2 rounded-3xl font-semibold text-white py-2 bg-gradient-to-r from-green-500 to-teal-600">
                        {roleName}
                    </div>
                </div>
                <div className="grid xl:grid-cols-2 sm:grid-cols-2 grid-cols-1 auto-rows-auto gap-2">
                    <Card
                        icon={faPeopleGroup}
                        label={"Users"}
                        data={props.users_count}
                        color={"bg-gradient-to-r from-blue-500 to-blue-700"}
                    />
                    <Card
                        icon={faClock}
                        label={"Items"}
                        data={props.items_count}
                        color={"bg-gradient-to-r from-yellow-500 to-green-700"}
                    />
                    <Card
                        icon={faBoxArchive}
                        label={"Products"}
                        data={props.products_count}
                        color={"bg-gradient-to-r from-green-500 to-green-700"}
                    />
                    <Card
                        icon={faComputerMouse}
                        label={"Categories"}
                        data={props.categories_count}
                        color={"bg-gradient-to-r from-red-500 to-orange-700"}
                    />
                    <Card
                        icon={faCopyright}
                        label={"Brands"}
                        data={props.brands_count}
                        color={"bg-gradient-to-r from-blue-500 to-blue-700"}
                    />
                    <Card
                        icon={faLayerGroup}
                        label={"Models"}
                        data={props.models_count}
                        color={"bg-gradient-to-r from-rose-500 to-pink-700"}
                    />
                </div>
            </div>
        </Main>
    );
}
