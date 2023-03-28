import { useEffect, useReducer, useState } from "react";
import EquipError, { displayError } from "./EquipError";
import EquipImporter from "./EquipImporter";
import EquipViewer from "./EquipViewer";

function validEquip(equip) {
	return equip.slot.includes('One Hand') || equip.slot.includes('Rings');
}

export default function EquipManager({ currentCharacter }) {
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
			case "Remove Dilemna":
				var { dilemnaEquip, ...newState } = state;
				return newState;
			case "Delete":
				return Object.keys(state)
					.filter(key => state[key]?.name !== action.item.name)
					.reduce((total, key) => {
						total[key] = state[key];
						return total;
					}, {});
			default:
				return {
					...state,
					dilemnaEquip: action.item
				}
		}
	}

	useEffect(() => {
		if (equips.dilemnaEquip) {
			if (validEquip(equips.dilemnaEquip)) setCurrentEquip(equips.dilemnaEquip);
			else {
				setError('Error: Invalid Item Detected');
				displayError();
			}
			dispatch({ slot: "Remove Dilemna", item: {} });
		} else {
			localStorage.setItem("TEST CHARACTER", JSON.stringify({ name: "TEST CHARACTER", ...equips }));
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
				if (currentEquip.slot.includes("One Hand")) {
					dispatch({ slot: "Main Hand", item: currentEquip });
					setCurrentEquip({});
				}
				return;
			case "off hand":
				if (currentEquip.slot.includes("One Hand")) {
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
			<EquipImporter handleOpen={importerOpened} newEquip={newEquip}
				buttonMessage={currentEquip.name ? `Select a Slot for ${currentEquip.name}` : "Import Item (Ctrl + V)"}
			/>

			<div className="grid grid-cols-8 grid-rows-6 gap-4 [&>*]:w-16 [&>*]:h-16">
				{/* MAIN HAND */}
				<div className="">
					<button className="btn btn-outline w-double h-quad"
						disabled={currentEquip.name && !currentEquip.slot.includes('One Hand')}
						onClick={() => currentEquip.name ? handleChoiceInput("main hand") :
							equips.mainHand ? handleEquipClick(equips.mainHand.id) : null}
					>
						{equips.mainHand ? equips.mainHand.name : "No Main Hand"}
					</button>
				</div>

				{/* HELMET */}
				<div className="col-start-4">
					<button className="btn btn-outline w-double h-double"
						disabled={currentEquip.name}
						onClick={() => equips.helmet ? handleEquipClick(equips.helmet.id) : null}
					>
						{equips.helmet ? equips.helmet.name : "No Helmet"}
					</button>
				</div>

				{/* OFF HAND */}
				<div className="col-start-7">
					<button className="btn btn-outline w-double h-quad"
						disabled={currentEquip.name && !currentEquip.slot.includes('One Hand')}
						onClick={() => currentEquip.name ? handleChoiceInput("off hand") :
							equips.offHand ? handleEquipClick(equips.offHand.id) : null}
					>
						{equips.offHand ? equips.offHand.name : "No Off Hand"}
					</button>
				</div>

				{/* BODY ARMOUR */}
				<div className="row-start-3 col-start-4">
					<button className="btn btn-outline w-double h-triple"
						disabled={currentEquip.name}
						onClick={() => equips.bodyArmour ? handleEquipClick(equips.bodyArmour.id) : null}
					>
						{equips.bodyArmour ? equips.bodyArmour.name : "No Body Armour"}
					</button>
				</div>

				{/* AMULET */}
				<div className="row-start-3 col-start-6">
					<button className="btn btn-outline w-full h-full"
						disabled={currentEquip.name}
						onClick={() => equips.amulet ? handleEquipClick(equips.amulet.id) : null}
					>
						{equips.amulet ? equips.amulet.name : "No Amulet"}
					</button>
				</div>

				{/* LEFT RING */}
				<div className="row-start-4 col-start-3">
					<button className="btn btn-outline w-full h-full"
						disabled={currentEquip.name && !currentEquip.slot.includes('Rings')}
						onClick={() => currentEquip.name ? handleChoiceInput("left ring") :
							equips.leftRing ? handleEquipClick(equips.leftRing.id) : null}
					>
						{equips.leftRing ? equips.leftRing.name : "No Left Ring"}
					</button>
				</div>

				{/* RIGHT RING */}
				<div className="row-start-4 col-start-6">
					<button className="btn btn-outline w-full h-full"
						disabled={currentEquip.name && !currentEquip.slot.includes('Rings')}
						onClick={() => currentEquip.name ? handleChoiceInput("right ring") :
							equips.rightRing ? handleEquipClick(equips.rightRing.id) : null}
					>
						{equips.rightRing ? equips.rightRing.name : "No Right Ring"}
					</button>
				</div>

				{/* GLOVES */}
				<div className="row-start-5 col-start-2">
					<button className="btn btn-outline w-double h-double"
						disabled={currentEquip.name}
						onClick={() => equips.glove ? handleEquipClick(equips.glove.id) : null}
					>
						{equips.glove ? equips.glove.name : "No Gloves"}
					</button>
				</div>

				{/* BOOTS */}
				<div className="row-start-5 col-start-6">
					<button className="btn btn-outline w-double h-double"
						disabled={currentEquip.name}
						onClick={() => equips.boot ? handleEquipClick(equips.boot.id) : null}
					>
						{equips.boot ? equips.boot.name : "No Boots"}
					</button>
				</div>

				{/* BELT */}
				<div className="row-start-6 col-start-4">
					<button className="btn btn-outline w-double h-full"
						disabled={currentEquip.name}
						onClick={() => equips.belt ? handleEquipClick(equips.belt.id) : null}
					>
						{equips.belt ? equips.belt.name : "No Belt"}
					</button>
				</div>
			</div>

			<EquipViewer equipment={equips} deleteEquip={deleteEquip} />
			<div className="w-11/12 p-4 mb-28 bg-primary rounded-lg text-secondary">
				<h2 className="text-4xl underline">{equips.name}</h2>
				<p>Age - ???</p>
				<h3 className="text-2xl underline">Total Cost</h3>
				<p>1 Alch</p>
				<p>1 Chaos</p>
				<p>1 Exalted</p>
				<p>1 Divine</p>
			</div>
		</>
	);
}