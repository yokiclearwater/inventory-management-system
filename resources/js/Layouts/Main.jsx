import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComputer,
    faTable,
    faBars,
    faClose,
    faUser,
    faCopyright,
    faLayerGroup,
    faBook,
    faBox,
    faClock,
    faPerson,
    faCubesStacked,
    faMap,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/Components/Dropdown";
import SideNav from "@/Components/SideNav";
import { Head } from "@inertiajs/inertia-react";

const Main = ({ auth, children, title = "Dashboard" }) => {
    const [showNavigation, setShowNavigation] = React.useState(false);
    const listItems = [
        {
            icon: faComputer,
            label: "Dashboard",
            color: "text-green-500",
            route: "dashboard",
            activeRoute: "dashboard",
        },
        {
            icon: faClock,
            label: "Items",
            color: "text-red-500",
            route: "items.index",
            activeRoute: "items.*",
        },
        {
            icon: faBox,
            label: "Products",
            color: "text-purple-500",
            route: "products.index",
            activeRoute: "products.*",
        },
        {
            icon: faTable,
            label: "Categories",
            color: "text-orange-500",
            route: "categories.index",
            activeRoute: "categories.*",
        },
        {
            icon: faCopyright,
            label: "Brands",
            color: "text-blue-500",
            route: "brands.index",
            activeRoute: "brands.*",
        },
        {
            icon: faLayerGroup,
            label: "Models",
            color: "text-pink-500",
            route: "models.index",
            activeRoute: "models.*",
        },
        {
            icon: faMap,
            label: "Locations",
            color: "text-emerald-600",
            route: "locations.index",
            activeRoute: "locations.*",
        },
        {
            icon: faBook,
            label: "Audit Logs",
            color: "text-lime-600",
            route: "logs.index",
            activeRoute: "logs.*",
        },
    ];

    if (auth.role.name === "super_admin") {
        listItems.push({
            icon: faPerson,
            label: "Roles",
            color: "text-sky-500",
            route: "roles.index",
            activeRoute: "roles.*",
        });
    }

    return (
        <>
            <div className="bg-gray-200 min-h-[120vh] h-full">
                <div className="min-h-[500px] bg-[url('https://images.hdqwalls.com/wallpapers/mountain-landscape-illustration-ls.jpg')] bg-blue-500 z-1 bg-blend-overlay absolute w-full"></div>
                <SideNav navActive={showNavigation} listItems={listItems} />
                <main className="block xl:ml-[17rem] m-l-0 relative transition-all min-h-screen min-w-screen h-full">
                    <nav className="text-white mx-4 text-xl">
                        <div className="py-2 rounded-lg px-4 flex items-center justify-between">
                            <div className="py-2 font-semibold xl:text-4xl text-3xl">
                                {title}
                            </div>
                            <div className="flex flex-row gap-4">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-semibold rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <span className="flex gap-2">
                                                    <FontAwesomeIcon
                                                        icon={faUser}
                                                    />
                                                    <span className="sm:block hidden">
                                                        {auth.user.name}
                                                    </span>
                                                </span>
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            className="md:hidden block"
                                            href={"#"}
                                            method="get"
                                            as="button"
                                        >
                                            {auth.user.name}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                <button
                                    onClick={() =>
                                        setShowNavigation(!showNavigation)
                                    }
                                    className="xl:hidden block text-3xl"
                                >
                                    <FontAwesomeIcon
                                        icon={showNavigation ? faClose : faBars}
                                    />
                                </button>
                            </div>
                        </div>
                    </nav>
                    <div className="p-4">{children}</div>
                </main>
            </div>
        </>
    );
};

export default Main;
