import { useState, useRef, useEffect } from "react";

export default function CharacterSelect({ characterChosen }) {
	const createMenu = useRef();
	const nameInput = useRef();
	const [characterList, setCharacterList] = useState([]);

	useEffect(() => {
		const storageData = localStorage.getItem("characters");
		const characterNames = JSON.parse(storageData);
		setCharacterList(characterNames);
	}, []);


	function openCreateMenu() {
		createMenu.current.showModal();
	}

	function closeCreateMenu() {
		createMenu.current.close();
	}

	function characterCreate(e) {
		e.preventDefault();

		const newList = [...characterList, nameInput.current.value];
		setCharacterList(newList);
		localStorage.setItem("characters", JSON.stringify(newList));

		nameInput.current.value = "";
		closeCreateMenu();
	}

	return (
		<>
			<dialog ref={createMenu} className="rounded-2xl relative p-10">
				{/* CLOSE BUTTON */}
				<button className="btn btn-circle btn-outline btn-sm absolute top-1 left-1" onClick={closeCreateMenu}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
				</button>

				<form onSubmit={characterCreate}>
					<h2>Make a Character</h2>
					<label>
						Name:
						<input ref={nameInput} className="input" />
					</label>
					<button type="submit" className="btn">Create Character</button>
				</form>
			</dialog>
			<h1>Pick a character</h1>
			<button className="btn" onClick={openCreateMenu}>Make a New Character</button>

			{characterList.length > 0 ?
				<ul>
					{characterList.map(char => (
						<li key={char}>
							<button
								key={char}
								onClick={() => characterChosen(char)}
								className="btn"
							>
								{char}
							</button>
						</li>
					))}
				</ul> :
				<p className="text-neutral-content">No Characters</p>
			}
		</>
	)
}