import { useEffect, useState } from "react";
import EquipLayout from "./components/EquipLayout";

export default function App() {
    useEffect(() => {
        window.addEventListener("keydown", (e) => handleKeyDown(e));
    }, []);

    function handleKeyDown(event) {
        if(event.key === "v" && (event.metaKey || event.ctrlKey)) {
            console.log("get the paste!!!");
        }
    }

    return (
        <main className="mx-auto max-w-2xl pt-10 flex flex-col items-center gap-4">
            <button className="btn btn-primary">Import Item (Ctrl + V)</button>

            <EquipLayout />
        </main>
    );
} 