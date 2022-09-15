import React from "react";

function Pagination({ className = "", tables }) {
    return (
        <ul className={`inline-flex -space-x-px ${className}`}>
            {tables.links.map((link, index) => {
                const label =
                    index === 0
                        ? "Previous"
                        : index === tables.links.length - 1
                        ? "Next"
                        : link.label;
                var classCheck =
                    "text-gray-800 hover:text-gray-700 hover:bg-gray-100";

                if ((tables.prev_page_url === null && index === 0) || (index === tables.links.length - 1 && tables.next_page_url === null)) {
                    classCheck = "text-gray-400 cursor-default";
                }

                return (
                    <li key={index}>
                        <a
                            href={link.url}
                            className={`py-2 px-3 leading-tight ${index === 0 && "rounded-l-lg"} ${index === tables.links.length - 1 && "rounded-r-lg"} bg-white border border-gray-300 ${classCheck}  ${
                                link.active
                                    ? "text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100"
                                    : ""
                            }`}
                        >
                            {label}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default Pagination;
