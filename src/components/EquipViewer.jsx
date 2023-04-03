import { useState } from "react";
import { formatTimeAgo } from "./utils";

const CURRENCIES = {
	a: "Alchemy Orbs",
	c: "Chaos Orbs",
	e: "Exalted Orbs",
	d: "Divine Orbs"
}

function formatCost(cost) {
	return `${cost.amount} ${CURRENCIES[cost.currency]}`
}

function sortByDate(a, b) {
	const dateA = Date.parse(a.date);
	const dateB = Date.parse(b.date);

	if (dateA < dateB) {
		return 1;
	} else {
		return -1;
	}
}

const PRICES = {
	a: 0,
	c: 1,
	e: 2,
	d: 3
}

function sortByPrice(a, b) {
	const aCost = a.cost;
	const bCost = b.cost;

	if (PRICES[aCost.currency] > PRICES[bCost.currency]) {
		return 1;
	} else if (PRICES[aCost.currency] === PRICES[bCost.currency]) {
		// They have the same currency type...
		if (aCost.amount > bCost.amount) {
			return 1;
		} else if (aCost.amount === bCost.amount) {
			return sortByDate(a, b);
		} else {
			return -1;
		}
	} else {
		return -1;
	}
}

export default function EquipViewer({ equipment, deleteEquip }) {
	const [sortMethod, setSortMethod] = useState("time");
	const { name: characterName, dateCreated: _, ...equips } = equipment;
	console.log("coming in:", equipment, "getting fed: ", equips);
	
	const sortedEquips = Object.keys(equips)
		.map(key => ({
			...equips[key], slot: (key.charAt(0).toUpperCase() + key.slice(1))
				.split(/(?=[A-Z])/).join(" ")
		}))
		.sort((a, b) => sortMethod === "time" ? sortByDate(a, b) : sortByPrice(a, b));

	const EquipCard = (equip) => {
		equip.formattedDate = formatTimeAgo(Date.parse(equip.date));

		return (
			<div key={equip.name} id={equip.id} className="bg-base-200 border border-base-300 rounded py-2 px-4 flex flex-col gap-3 relative">
				<button onClick={() => deleteEquip(equip)} title="Delete" className="w-10 h-10 min-h-0 absolute right-2 btn btn-circle btn-outline btn-error">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
				</button>
				{/* SLOT & NAME */}
				<h3 className="text-2xl font-semibold">
					{equip.slot} - {equip.name}
				</h3>
				<div className="pr-8">
					{equip.formattedDate} - {formatCost(equip.cost)}
				</div>
			</div>
		);
	}

	return (
		<section className="w-full">
			<div className="w-full flex justify-between items-end">
				<h2 className="text-center text-4xl font-bold underline mb-1">{characterName}'s Equips</h2>
				<div className="form-control max-w-xs">
					<label className="label">
						<span className="label-text font-bold underline">Sort By:</span>
					</label>
					<select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)} className="select select-primary">
						<option value="time">Time Acquired</option>
						<option value="price">Price</option>
					</select>
				</div>
			</div>
			<div className="p-8 flex flex-col gap-4">
				{sortedEquips.map(EquipCard)}
			</div>
		</section>
	);
}