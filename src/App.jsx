import { useState } from "react";
import CharacterSelect from "./components/CharacterSelect";
import EquipManager from "./components/EquipManager";

export function newCharacter(name) {
	return {
		name,
		dateCreated: new Date()
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

	function closeCharacter() {
		setCharacter({});
	}

	return (
		<main className="mx-auto max-w-2xl flex flex-col items-center gap-4">
			{character.name ?
				<EquipManager
					currentCharacter={character}
					closeCharacter={closeCharacter}
				/> :
				<CharacterSelect
					characterChosen={characterChosen}
				/>
			}
		</main>
	);
} 