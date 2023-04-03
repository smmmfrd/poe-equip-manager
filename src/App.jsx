import { useState } from "react";
import CharacterSelect from "./components/CharacterSelect";
import EquipManager from "./components/EquipManager";

export function newCharacter(name) {
	return {
		name
	}
}

export default function App() {
	const [character, setCharacter] = useState({});

	function characterChosen(name) {
		var charData = localStorage.getItem(name);
		if (charData === null) {
			charData = newCharacter(name);
		}
		console.log(`${name}'s data:`, charData);
		setCharacter(charData);
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