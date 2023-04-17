import { useState, useEffect } from "react";
import CharacterSelect from "./components/CharacterSelect";
import EquipManager from "./components/EquipManager";
import { AiFillBug } from "react-icons/ai"

export function newCharacter(name) {
	return {
		name,
		dateCreated: new Date()
	}
}

export default function App() {
	const [character, setCharacter] = useState({});

	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', darkMode ? 'luxury' : 'bumblebee');
	}, [darkMode]);

	function characterChosen(name) {
		var charData = localStorage.getItem(name);
		if (charData === null) {
			charData = newCharacter(name);
		} else {
			charData = JSON.parse(charData);
		}
		setCharacter(charData);
	}

	function closeCharacter() {
		setCharacter({});
	}

	return (
		<>
			<header className="bg-neutral-content text-neutral px-4 py-2 flex justify-between">
				<h1 className="text-4xl font-bold">PoE Equip Manager</h1>
				<nav className="flex flex-row-reverse gap-2">
					<button
						className="btn btn-square btn-ghost text-sm p-2.5"
						onClick={() => setDarkMode(prev => !prev)}
					>
						<svg className={`w-5 h-5 fill-neutral ${darkMode ? "" : "hidden"}`}
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
							></path>
						</svg>
						<svg className={`w-5 h-5 fill-neutral ${darkMode ? "hidden" : ""}`}
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path>
						</svg>
					</button>
					<button className="btn btn-square btn-ghost"
						title="Report a Bug">
						<AiFillBug className="w-5 h-5"/>
					</button>
				</nav>
			</header>
			<main className="mx-auto max-w-2xl flex flex-col items-center gap-4">
				{Object.keys(character).length > 0 ?
					<EquipManager
						currentCharacter={character}
						closeCharacter={closeCharacter}
					/> :
					<CharacterSelect
						characterChosen={characterChosen}
					/>
				}
			</main>
		</>
	);
} 