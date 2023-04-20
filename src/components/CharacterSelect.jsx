import { useState, useRef, useEffect } from "react";

export default function CharacterSelect({ characterChosen }) {
	const createMenu = useRef();
	const confirmMenu = useRef();
	const nameInput = useRef();

	const [characterList, setCharacterList] = useState([]);
	const [deleteChar, setDeleteChar] = useState("");

	useEffect(() => {
		if (localStorage.getItem("characters") !== null) {
			const storageData = localStorage.getItem("characters");
			const characterNames = JSON.parse(storageData);
			setCharacterList(characterNames);
		}
		else {
			setCharacterList([]);
		}
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

	function openConfirmMenu() {
		confirmMenu.current.showModal();
	}

	function closeConfirmMenu() {
		confirmMenu.current.close();
		setDeleteChar("");
	}

	function deleteCharacter(name) {
		console.log('Deleting: ', name);

		const newList = characterList.filter(char => char !== name);
		setCharacterList(newList);
		localStorage.setItem("characters", JSON.stringify(newList));
	}

	function confirmDelete(e, char) {
		e.stopPropagation();
		openConfirmMenu();
		setDeleteChar(char);
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
						className="group-hover:opacity-100 opacity-30 transition-opacity duration-200 btn btn-circle btn-outline btn-error btn-xs"
						title="Delete this Character"
						onClick={(e) => confirmDelete(e, char)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" fill="none" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
					</span>
				</button>
			</li>
		)
	}

	return (
		<>
			<dialog ref={createMenu} className="w-1/2 rounded-2xl relative py-2 px-6">
				{/* CLOSE BUTTON */}
				<button
					title="Cancel"
					className="btn btn-circle btn-outline btn-sm absolute top-2 right-2"
					onClick={closeCreateMenu}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
				</button>

				<h2 className="text-base-content text-3xl bold">Add a Character</h2>
				<div className="divider"></div>

				<form onSubmit={characterCreate} className="flex flex-col items-start">
					<label className="flex flex-col text-left">
						<span className="block text-xl text-base-content">
							Name:
						</span>
						<input
							type="text"
							ref={nameInput}
							pattern="[a-zA-Z]{7,23}"
							minLength={7}
							maxLength={23}
							placeholder=""
							className="input peer"
						/>
						<p className="peer-invalid:visible invisible w-full text-error pt-1 pb-4">
							Please enter a valid name, 7-23 characters only.
						</p>
					</label>
					<div className="divider"></div>
					<div className="w-full flex gap-6 items-end">
						<button
							title="Create"
							type="submit"
							className="btn btn-info">
							Create Character</button>
						<button
							title="Close Window"
							type="button"
							className="btn"
							onClick={() => closeCreateMenu()}
						>
							Cancel
						</button>
					</div>
				</form>
			</dialog>

			<dialog ref={confirmMenu}
				className="rounded-2xl px-6 py-6">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						closeConfirmMenu();
					}}
					className="flex flex-col gap-8 items-center"
				>
					<header className="text-base-content">
						<h2 className="text-2xl underline bold">Deleting a Character...</h2>
						<p className="w-64">Doing so will permanently erase all data associated with it.</p>
					</header>
					<button className="btn btn-error"
						onClick={() => deleteCharacter(deleteChar)}
						title="Confirm Deletion"
						type="submit">
						Delete - {deleteChar}
					</button>
					<button className="btn btn-secondary"
						title="Cancel"
						onClick={closeConfirmMenu}>
						Cancel
					</button>
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