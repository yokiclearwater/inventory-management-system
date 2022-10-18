import React from "react";

function Table({ tables, handleDelete, routeList }) {
    return (
        <>
            <table className="text-left w-full table-auto lg:text-xl text-lg">
                <thead className="bg-blue-600 text-white">
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
                    {tables.data.map((table, index) => {


                        return (
                            <tr
                                className={`even:bg-blue-200 odd:bg-blue-100 hover:bg-blue-300`}
                                itemScope={"row"}
                                key={index}
                            >
                                <th className="py-2 px-4" scope="col">
                                    {table.id}
                                </th>
                                <td className="py-2 px-4" scope="col">
                                    {table.name}
                                </td>
                                <td
                                    className="py-2 px-4 inline-flex space-x-2 items-center justify-start"
                                    scope="col"
                                >
                                    <a
                                        className="hover:underline cursor-pointer text-green-700 font-semibold"
                                        href={route(routeList.show, {
                                            id: table.id,
                                        })}
                                    >
                                        View
                                    </a>
                                    <a
                                        className="hover:underline cursor-pointer text-blue-600 font-semibold"
                                        href={route(routeList.edit, {
                                            id: table.id,
                                        })}
                                    >
                                        Edit
                                    </a>
                                    <a
                                        className="hover:underline cursor-pointer text-red-600 font-semibold"
                                        onClick={() =>
                                            handleDelete(table.id)
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
