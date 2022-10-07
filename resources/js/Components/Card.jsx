import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Card(props) {
    return (
        <div className={`bg-white p-4 rounded-lg flex flex-row justify-between shadow ${props.className}`}>
            <div className="text-3xl flex flex-col gap-2">
                <span className="font-bold">{props.label}</span>
                <span className="text-2xl">{props.data}</span>
            </div>
            <div className={`rounded-full ${props.color} flex items-center justify-center text-2xl w-[50px] h-[50px] text-white`}>
                <FontAwesomeIcon icon={props.icon} />
            </div>
        </div>
    );
}

export default Card;
