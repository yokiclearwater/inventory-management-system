import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";

export default function SideNav({ navActive, listItems }) {
    return (
        <aside
            className={`flex items-center justify-center text-black z-50 fixed w-full !max-w-[17rem] min-h-screen transition-all ${
                navActive ? "translate-x-0" : "-translate-x-[17rem]"
            } xl:translate-x-0`}
        >
            <div className="bg-white p-2 w-[90%] h-[97vh] rounded-xl shadow overflow-y-auto">
                <div className="w-full p-4 flex flex-row gap-2">
                    <FontAwesomeIcon className="text-2xl" icon={faDashboard} />
                    <span>Laravel Dashboard</span>
                </div>
                <hr className="my-2" />
                <ul className="">
                    {listItems.map((item, index) => (
                        <li
                            key={index}
                            className="my-1 rounded-lg hover:bg-gray-100"
                        >
                            <a
                                href={route(item.route)}
                                className={`py-[11px] px-[16px] flex gap-4 flex-row items-center rounded-lg ${route().current(item.activeRoute) && 'bg-gray-200'}`}
                            >
                                <div className={`text-xl ${item.color}`}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <span className="text-lg">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
