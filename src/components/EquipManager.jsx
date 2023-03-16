import { useEffect, useReducer, useState } from "react";
import EquipError, {displayError} from "./EquipError";
import EquipImporter from "./EquipImporter";
import EquipViewer from "./EquipViewer";

export default function EquipManager({ currentCharacter }) {
	const [equips, dispatch] = useReducer(reducer, currentCharacter);
	const [currentEquip, setCurrentEquip] = useState({});

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
			setCurrentEquip(equips.dilemnaEquip);
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
			displayError();
			return;
		}

		dispatch({ slot: equip.slot, item: equip });
	}

	function deleteEquip(equip) {
		dispatch({ slot: "Delete", item: equip });
	}

	function handleChoiceInput(choice) {
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

	return (
		<>
			<EquipError />
			<EquipImporter handleOpen={importerOpened} newEquip={newEquip}
				buttonMessage={currentEquip.name ? `Select a Slot for ${currentEquip.name}` : "Import Item (Ctrl + V)"}
			/>

			<div className="grid grid-cols-8 grid-rows-6 gap-4 [&>*]:w-16 [&>*]:h-16">
				<div className="">
					<button className="btn btn-outline w-double h-quad"
						disabled={currentEquip.name && !currentEquip.slot.includes('One Hand')}
						onClick={() => handleChoiceInput("main hand")}
					>
						{equips.mainHand ? equips.mainHand.name : "No Main Hand"}
					</button>
				</div>
				<div className="col-start-4">
					<button className="btn btn-outline w-double h-double" disabled={currentEquip.name}>
						{equips.helmet ? equips.helmet.name : "Helmet"}
					</button>
				</div>
				<div className="col-start-7">
					<button className="btn btn-outline w-double h-quad"
						disabled={currentEquip.name && !currentEquip.slot.includes('One Hand')}
						onClick={() => handleChoiceInput("off hand")}
					>
						{equips.offHand ? equips.offHand.name : "No Off Hand"}
					</button>
				</div>
				<div className="row-start-3 col-start-4">
					<button className="btn btn-outline w-double h-triple" disabled={currentEquip.name}>
						{equips.bodyArmour ? equips.bodyArmour.name : "No Body Armour"}
					</button>
				</div>
				<div className="row-start-3 col-start-6">
					<button className="btn btn-outline w-full h-full" disabled={currentEquip.name}>
						{equips.amulet ? equips.amulet.name : "No Amulet"}
					</button>
				</div>
				<div className="row-start-4 col-start-3">
					<button className="btn btn-outline w-full h-full"
						disabled={currentEquip.name && !currentEquip.slot.includes('Rings')}
						onClick={() => handleChoiceInput("left ring")}
					>
						{equips.leftRing ? equips.leftRing.name : "No Left Ring"}
					</button>
				</div>
				<div className="row-start-4 col-start-6">
					<button className="btn btn-outline w-full h-full"
						disabled={currentEquip.name && !currentEquip.slot.includes('Rings')}
						onClick={() => handleChoiceInput("right ring")}
					>
						{equips.rightRing ? equips.rightRing.name : "No Right Ring"}
					</button>
				</div>
				<div className="row-start-5 col-start-2">
					<button className="btn btn-outline w-double h-double" disabled={currentEquip.name}>
						{equips.glove ? equips.glove.name : "No Gloves"}
					</button>
				</div>
				<div className="row-start-5 col-start-6">
					<button className="btn btn-outline w-double h-double" disabled={currentEquip.name}>
						{equips.boot ? equips.boot.name : "No Boots"}
					</button>
				</div>
				<div className="row-start-6 col-start-4">
					<button className="btn btn-outline w-double h-full" disabled={currentEquip.name}>
						{equips.belt ? equips.belt.name : "No Belt"}
					</button>
				</div>
			</div>

			<EquipViewer equipment={equips} deleteEquip={deleteEquip} />
		</>
	);
}