import React from "react";

function Modal({ className, children }) {
    return (
        <div className="text-xl bg-black/40 fixed z-[9999] w-screen min-h-screen h-full flex items-center justify-center">
            <div className={`bg-white  w-[600px] max-w-[90%] max-h-[80%] h-fit shadow-xl ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
