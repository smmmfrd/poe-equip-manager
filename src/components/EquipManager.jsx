import { useEffect, useReducer, useState } from "react";
import CharacterData from "./CharacterData";
import EquipError, { displayError } from "./EquipError";
import EquipImporter from "./EquipImporter";
import EquipViewer from "./EquipViewer";

function validEquip(equip) {
	return equip.slot.includes('One Hand') || equip.slot.includes('Rings') || equip.slot.includes('Sceptres');
}

export default function EquipManager({ currentCharacter, closeCharacter }) {
	const [equips, dispatch] = useReducer(reducer, currentCharacter);
	const [currentEquip, setCurrentEquip] = useState({});
	const [error, setError] = useState('');

	function reducer(state, action) {
		switch (action.slot) {
			case "Helmets":
				return {
					...state,
					helmet: action.item
				};
			case "Boots":
				return {
					...state,
					boot: action.item
				};
			case "Gloves":
				return {
					...state,
					glove: action.item
				};
			case "Body Armours":
				return {
					...state,
					bodyArmour: action.item
				};
			case "Belts":
				return {
					...state,
					belt: action.item
				};
			case "Amulets":
				return {
					...state,
					amulet: action.item
				};
			case "Main Hand":
			case "Bow":
			case "Staves":
				if (action.item.slot.includes("Two Hand") || action.item.slot === "Staves") {
					const { offHand, ...newState } = state;
					return {
						...newState,
						mainHand: action.item
					}
				}
				return {
					...state,
					mainHand: action.item
				};
			case "Off Hand":
			case "Shields":
			case "Quivers":
				return {
					...state,
					offHand: action.item
				}
			case "Right Ring":
				return {
					...state,
					rightRing: action.item
				}
			case "Left Ring":
				return {
					...state,
					leftRing: action.item
				}
			case "Jewel":
				return {
					...state,
					jewels: state.jewels ? [...state.jewels, action.item] : [action.item]
				}
			case "Remove Dilemna":
				var { dilemnaEquip, ...newState } = state;
				return newState;
			case "Delete":
				if (action.item.slot !== 'Jewel') {
					return Object.keys(state)
						.filter(key => state[key]?.name !== action.item.name)
						.reduce((total, key) => {
							total[key] = state[key];
							return total;
						}, {});
				} else {
					return {
						...state,
						jewels: state.jewels.filter(jewel => jewel.id !== action.item.id)
					}
				}
			default:
				return {
					...state,
					dilemnaEquip: action.item
				}
		}
	}

	useEffect(() => {
		if (equips.dilemnaEquip) {
			if (validEquip(equips.dilemnaEquip)) {
				setCurrentEquip(equips.dilemnaEquip);
			} else if (equips.dilemnaEquip.slot.includes('Two Hand')) {
				dispatch({ slot: "Main Hand", item: equips.dilemnaEquip });
			} else {
				// console.log(equips.dilemnaEquip);
				setError('Error: Invalid Item Detected');
				displayError();
			}
			dispatch({ slot: "Remove Dilemna", item: {} });
		} else {
			localStorage.setItem(currentCharacter.name, JSON.stringify({
				name: currentCharacter.name,
				dateCreated: currentCharacter.dateCreated,
				...equips
			}));
		}
	}, [equips]);

	function importerOpened() {
		setCurrentEquip({});
	}

	function newEquip(equip) {
		// Check for duplicates
		const dupe = (newEquip) => Object.keys(equips).
			some(key => equips[key]?.name === newEquip.name);

		if (dupe(equip)) {
			setError('Error: Duplicate Item Detected!');
			displayError();
			return;
		}

		dispatch({ slot: equip.slot, item: equip });
	}

	function deleteEquip(equip) {
		dispatch({ slot: "Delete", item: equip });
	}

	function handleChoiceInput(choice) {
		if (Object.keys(currentEquip).length === 0) return;

		switch (choice) {
			case "main hand":
				if (currentEquip.slot.includes("One Hand") || currentEquip.slot.includes('Sceptres')) {
					dispatch({ slot: "Main Hand", item: currentEquip });
					setCurrentEquip({});
				}
				return;
			case "off hand":
				if (currentEquip.slot.includes("One Hand") || currentEquip.slot.includes('Sceptres')) {
					dispatch({ slot: "Off Hand", item: currentEquip });
					setCurrentEquip({});
				}
				return;
			case "right ring":
				dispatch({ slot: "Right Ring", item: currentEquip });
				setCurrentEquip({});
				return;
			case "left ring":
				dispatch({ slot: "Left Ring", item: currentEquip });
				setCurrentEquip({});
				return;
		}
	}

	function handleEquipClick(id) {
		document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "end" });
	}

	return (
		<>
			<EquipError error={error} />
			<EquipImporter
				handleOpen={importerOpened}
				newEquip={newEquip}
				buttonMessage={currentEquip.name ? `Select a Slot for ${currentEquip.name}` : "Import Item (Ctrl + V)"}
			>
				<button
					title="Close"
					className="btn btn-circle btn-outline btn-sm absolute top-0 -right-48"
					onClick={closeCharacter}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
				</button>
			</EquipImporter>

			{/* Equip Display */}
			<section className="grid grid-cols-8 grid-rows-6 gap-4 [&>*]:w-16 [&>*]:h-16">
				
				{/* MAIN HAND */}
				<div className="">
					<button className="btn btn-outline w-double h-quad"
						disabled={equips.mainHand ? currentEquip.name &&
							!(currentEquip.slot.includes('One Hand')
								|| currentEquip.slot.includes('Sceptres')) : true}
						onClick={() => currentEquip.name ? handleChoiceInput("main hand") :
							equips.mainHand ? handleEquipClick(equips.mainHand.id) : null}
					>
						{equips.mainHand ? equips.mainHand.name : "No Main Hand"}
					</button>
				</div>

				{/* HELMET */}
				<div className="col-start-4">
					<button className="btn btn-outline w-double h-double"
						disabled={equips.helmet ? currentEquip.name : true}
						onClick={() => equips.helmet ? handleEquipClick(equips.helmet.id) : null}
					>
						{equips.helmet ? equips.helmet.name : "No Helmet"}
					</button>
				</div>

				{/* OFF HAND */}
				<div className="col-start-7">
					<button className="btn btn-outline w-double h-quad"
						disabled={equips.offHand ? currentEquip.name && 
							!(currentEquip.slot.includes('One Hand') || currentEquip.slot.includes('Sceptres')) : true}
						onClick={() => currentEquip.name ? handleChoiceInput("off hand") :
							equips.offHand ? handleEquipClick(equips.offHand.id) : null}
					>
						{equips.offHand ? equips.offHand.name : "No Off Hand"}
					</button>
				</div>

				{/* BODY ARMOUR */}
				<div className="row-start-3 col-start-4">
					<button className="btn btn-outline w-double h-triple"
						disabled={equips.bodyArmour ? currentEquip.name : true}
						onClick={() => equips.bodyArmour ? handleEquipClick(equips.bodyArmour.id) : null}
					>
						{equips.bodyArmour ? equips.bodyArmour.name : "No Body Armour"}
					</button>
				</div>

				{/* AMULET */}
				<div className="row-start-3 col-start-6">
					<button className="btn btn-outline w-full h-full"
						disabled={equips.amulet ? currentEquip.name : true}
						onClick={() => equips.amulet ? handleEquipClick(equips.amulet.id) : null}
					>
						{equips.amulet ? equips.amulet.name : "No Amulet"}
					</button>
				</div>

				{/* LEFT RING */}
				<div className="row-start-4 col-start-3">
					<button className="btn btn-outline w-full h-full"
						disabled={equips.leftRing ? currentEquip.name && 
							!currentEquip.slot.includes('Rings') : true}
						onClick={() => currentEquip.name ? handleChoiceInput("left ring") :
							equips.leftRing ? handleEquipClick(equips.leftRing.id) : null}
					>
						{equips.leftRing ? equips.leftRing.name : "No Left Ring"}
					</button>
				</div>

				{/* RIGHT RING */}
				<div className="row-start-4 col-start-6">
					<button className="btn btn-outline w-full h-full"
						disabled={equips.rightRing ? currentEquip.name &&
							!currentEquip.slot.includes('Rings') : true}
						onClick={() => currentEquip.name ? handleChoiceInput("right ring") :
							equips.rightRing ? handleEquipClick(equips.rightRing.id) : null}
					>
						{equips.rightRing ? equips.rightRing.name : "No Right Ring"}
					</button>
				</div>

				{/* GLOVES */}
				<div className="row-start-5 col-start-2">
					<button className="btn btn-outline w-double h-double"
						disabled={equips.glove ? currentEquip.name : true}
						onClick={() => equips.glove ? handleEquipClick(equips.glove.id) : null}
					>
						{equips.glove ? equips.glove.name : "No Gloves"}
					</button>
				</div>

				{/* BOOTS */}
				<div className="row-start-5 col-start-6">
					<button className="btn btn-outline w-double h-double"
						disabled={equips.boot ? currentEquip.name : true}
						onClick={() => equips.boot ? handleEquipClick(equips.boot.id) : null}
					>
						{equips.boot ? equips.boot.name : "No Boots"}
					</button>
				</div>

				{/* BELT */}
				<div className="row-start-6 col-start-4">
					<button className="btn btn-outline w-double h-full"
						disabled={equips.belt ? currentEquip.name : true}
						onClick={() => equips.belt ? handleEquipClick(equips.belt.id) : null}
					>
						{equips.belt ? equips.belt.name : "No Belt"}
					</button>
				</div>

			</section>

			{/* JEWEL DISPLAY */}
			<section className="w-full px-16">
				<header className="text-left mb-4">
					<h3 className="text-xl bold underline">Jewels</h3>
				</header>
				<ul className="flex flex-wrap gap-4 px-4">
					{equips.jewels && equips.jewels.map(jewel =>
						<li key={jewel.id}>
							<button className="btn btn-outline btn-square btn-lg text-sm"
								onClick={() => handleEquipClick(jewel.id)}
							>
								{jewel.name}
							</button>
						</li>
					)}
				</ul>
			</section>

			<CharacterData data={equips} />

			<EquipViewer equipment={equips} deleteEquip={deleteEquip} />
		</>
	);
}