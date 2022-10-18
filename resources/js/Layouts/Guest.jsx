import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-row justify-between xl:bg-transparent bg-blue-400">
            <div className="2xl:basis-[40%] xl:basis-1/2 flex items-center justify-center w-full">
                <div className="xl:w-[70%] w-[90%] bg-blue-200 md:p-8 p-6 rounded-lg shadow">{children}</div>
            </div>
            <div className="2xl:basis-[60%] basis-[50%] xl:flex bg-blue-100 hidden items-center justify-center">
                <img
                    className="max-h-[60%]"
                    src="https://www.nogentech.org/wp-content/uploads/2021/09/InventoryManagement_Hero@3x.png"
                    alt="background"
                />
            </div>
        </div>
    );
}
