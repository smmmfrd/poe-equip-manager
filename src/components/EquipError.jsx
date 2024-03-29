import { useState } from "react";

var showError;

export function displayError() {
    showError();
}

export default function EquipError({ error }) {

    const [show, setShow] = useState(error);

    function start() {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 1000)
    }
    showError = start;
    return (
        <div className={`${show ? "h-min" : "h-0 p-0"} mt-1 duration-150 overflow-hidden alert alert-error shadow-lg justify-center`}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-8 w-8" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-xl font-bold">{error}</span>
            </div>
        </div>
    )
}