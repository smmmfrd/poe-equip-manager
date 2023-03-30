import { useEffect, useState } from "react";
import CharacterSelect from "./components/CharacterSelect";
import EquipManager from "./components/EquipManager";

export default function App() {
	const [character, setCharacter] = useState({});

	useEffect(() => {
		async function fetchCharacter() {
			const data = await JSON.parse(localStorage.getItem("TEST CHARACTER"));
			// localStorage.setItem("TEST CHARACTER", JSON.stringify({name: "TEST CHARACTER"}));
			// console.log(data);
			setCharacter(data);
		}

		// fetchCharacter();
	}, []);

	function characterChosen(name) {
		console.log(name);
	}

	return (
		<main className="mx-auto max-w-2xl flex flex-col items-center gap-4">
			{character.name ?
				<EquipManager
					currentCharacter={character}
				/> :
				<CharacterSelect
					characterChosen={characterChosen}
				/>
			}
		</main>
	);
} 