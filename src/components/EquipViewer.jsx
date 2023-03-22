const DATE_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
	numeric: 'auto'
});

// From Web Dev Simplified - https://blog.webdevsimplified.com/2020-07/relative-time-format/
const DIVISIONS = [
	{ amount: 60, name: 'seconds' },
	{ amount: 60, name: 'minutes' },
	{ amount: 24, name: 'hours' },
	{ amount: 7, name: 'days' },
	{ amount: 4.34524, name: 'weeks' },
	{ amount: 12, name: 'months' },
	{ amount: Number.POSITIVE_INFINITY, name: 'years' }
];

function formatTimeAgo(date) {
	let duration = (date - new Date()) / 1000;

	for (let i = 0; i < DIVISIONS.length; i++) {
		const division = DIVISIONS[i]
		if (Math.abs(duration) < division.amount) {
			return DATE_FORMATTER.format(Math.round(duration), division.name);
		}
		duration /= division.amount;
	}
}

const CURRENCIES = {
	a: "Alchemy Orbs",
	c: "Chaos Orbs",
	e: "Exalted Orbs",
	d: "Divine Orbs"
}

function formatCost(cost) {
	return `${cost.amount} ${CURRENCIES[cost.currency]}`
}

export default function EquipViewer({ equipment, deleteEquip }) {
	const { name: characterName, ...equips } = equipment;
	const sortedEquips = Object.keys(equips)
		.map(key => ({
			...equips[key], slot: (key.charAt(0).toUpperCase() + key.slice(1))
				.split(/(?=[A-Z])/).join(" ")
		}))
		.sort((a, b) => {
			const dateA = Date.parse(a.date);
			const dateB = Date.parse(b.date);

			if (dateA < dateB) {
				return 1;
			} else {
				return -1;
			}
		});
	// console.log(sortedEquips);

	const EquipCard = (equip) => {
		equip.formattedDate = formatTimeAgo(Date.parse(equip.date));

		return (
			<div key={equip.name} className="bg-base-200 border border-base-300 rounded py-2 px-4 flex flex-col gap-3 relative">
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
					<select defaultValue={0} className="select select-ghost select-sm">
						<option>Time Acquired</option>
						<option>Price</option>
					</select>
				</div>
			</div>
			<div className="p-8 flex flex-col gap-4">
				{sortedEquips.map(EquipCard)}
			</div>
		</section>
	);
}