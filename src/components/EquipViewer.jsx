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

export default function EquipViewer({ equipment }) {
	const { name: characterName, ...equips } = equipment;

	const EquipCard = (equipSlot) => {
		const equip = equips[equipSlot];
		equip.slot = equipSlot.charAt(0).toUpperCase() + equipSlot.slice(1);
		equip.formattedDate = formatTimeAgo(Date.parse(equip.date));

		return (
			<div key={equip.name} className="bg-base-200 border border-base-300 rounded py-2 px-4 flex flex-col gap-3">
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
			<h2 className="text-center text-3xl font-bold underline mb-4">{characterName}'s Equips</h2>
			<div className="p-8 flex flex-col gap-4">
				{Object.keys(equips).map(EquipCard)}
			</div>
		</section>
	);
}