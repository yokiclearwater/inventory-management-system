import React from "react";

function Table({ tables, handleDelete, routeList }) {
    return (
        <>
            <table className="text-left w-full table-auto lg:text-xl text-lg">
                <thead className="bg-indigo-500 text-white">
                    <tr itemScope={"row"}>
                        <th className="py-3 px-4" scope="col">
                            ID
                        </th>
                        <th className="py-3 px-4" scope="col">
                            Name
                        </th>
                        <th className="py-3 px-4" scope="col">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tables.data.map((category, index) => {
                        const bgColor =
                            index % 2 === 0 ? "bg-indigo-200" : "bg-indigo-100";

                        return (
                            <tr
                                className={`${bgColor} hover:bg-indigo-300`}
                                itemScope={"row"}
                                key={index}
                            >
                                <th className="py-2 px-4" scope="col">
                                    {category.id}
                                </th>
                                <td className="py-2 px-4" scope="col">
                                    {category.name}
                                </td>
                                <td
                                    className="py-2 px-4 inline-flex space-x-2 items-center justify-start"
                                    scope="col"
                                >
                                    <a
                                        className="hover:underline cursor-pointer text-green-700 font-semibold"
                                        href={route(routeList.show, {
                                            id: category.id,
                                        })}
                                    >
                                        View
                                    </a>
                                    <a
                                        className="hover:underline cursor-pointer text-indigo-600 font-semibold"
                                        href={route(routeList.edit, {
                                            id: category.id,
                                        })}
                                    >
                                        Edit
                                    </a>
                                    <a
                                        className="hover:underline cursor-pointer text-red-600 font-semibold"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Table;
