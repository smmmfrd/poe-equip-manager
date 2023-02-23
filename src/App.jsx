import { useEffect, useState } from "react";
import EquipManager from "./components/EquipManager";

export default function App() {
    const [character, setCharacter] = useState({});

    useEffect(() => {
        async function fetchCharacter() {
            const data = await JSON.parse(localStorage.getItem("TEST CHARACTER"));
            setCharacter(data);
        }

        fetchCharacter();
    }, []);

    return (
        <main className="mx-auto max-w-2xl pt-10 flex flex-col items-center gap-4">
            {character.name && <EquipManager currentCharacter={character}/>}
        </main>
    );
} 