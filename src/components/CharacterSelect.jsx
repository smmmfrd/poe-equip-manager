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

	function deleteCharacter(e, name) {
		e.stopPropagation();
		console.log('Deleting: ', name);

		const newList = characterList.filter(char => char !== name);
		setCharacterList(newList);
		localStorage.setItem("characters", JSON.stringify(newList));
	}

	function CharacterItem(char) {
		return (
			<li key={char} className="group btn w-max mx-auto" onClick={() => characterChosen(char)}>
				<button
					key={char}
					className="font-semibold text-lg flex items-center"
				>
					{char}
					<div
						className="group-hover:opacity-100 opacity-30 transition-opacity duration-200 divider divider-horizontal"
					></div>
					<span
						className="group-hover:opacity-100 opacity-30 transition-opacity duration-200 btn btn-circle btn-outline btn-xs"
						title="Delete this Character"
						onClick={(e) => deleteCharacter(e, char)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
					</span>
				</button>
			</li>
		)
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
					<div className="">
						<label>
							Name:
							<input
								type="text"
								ref={nameInput}
								pattern="[a-zA-Z]{7,23}"
								minLength={7}
								maxLength={23}
								placeholder="..."
								className="input peer"
							/>
							<p className="peer-invalid:visible invisible">
								Please enter a valid name, 7-23 characters only.
							</p>
						</label>
					</div>
					<button type="submit" className="btn">Create Character</button>
				</form>
			</dialog>
			<button className="mt-8 btn" onClick={openCreateMenu}>Make a New Character</button>

			{characterList.length > 0 ?
				<>
					<h1 className="text-4xl underline">PICK A CHARACTER</h1>
					<ul className="flex flex-col gap-8 text-center">
						{characterList.map(CharacterItem)}
					</ul>
				</> :
				<h2 className="text-neutral-content">No Characters</h2>
			}
		</>
	)
}