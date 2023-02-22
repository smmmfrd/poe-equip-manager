import { useRef } from "react";
import EquipLayout from "./components/EquipLayout";
import ItemImporter from "./components/ItemImporter";

export default function App() {
    const itemImporter = useRef(null);

    return (
        <main className="mx-auto max-w-2xl pt-10 flex flex-col items-center gap-4">
            <button className="btn btn-primary" onClick={() => itemImporter.current.showModal()}>Import Item (Ctrl + V)</button>
            <ItemImporter ref={itemImporter}/>
            <EquipLayout />
        </main>
    );
} 