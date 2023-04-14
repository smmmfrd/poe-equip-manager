import { formatTimeAgo } from "./utils";

export default function CharacterData({ data }) {
	const { name: characterName, dateCreated, ...equips } = data;

	const totalCost = Object.keys(equips).reduce((total, key) => {
		if (key !== "jewels") {
			const equipCost = equips[key].cost
			total[equipCost.currency] += parseInt(equipCost.amount);
		} else {
			// Jewels are an array
			equips[key].forEach((jewel) => {
				total[jewel.cost.currency] += parseInt(jewel.cost.amount);
			});
		}
		return total;
	}, { a: 0, c: 0, e: 0, d: 0 });

	return (
		<section className="w-11/12 py-4 px-8 bg-base-200 rounded-lg text-base-content flex justify-around">
			<header>
				<h2 className="text-4xl underline">{characterName}</h2>
				<p>Created - {formatTimeAgo(dateCreated)}</p>
			</header>
			<div className="basis-1/4">
				<h3 className="text-2xl underline">Total Cost</h3>
				<div className="text-right grid grid-cols-2 gap-0 items-end">
					{totalCost.a > 0 && <p>{totalCost.a} Alch</p>}
					{totalCost.c > 0 && <p>{totalCost.c} Chaos</p>}
					{totalCost.e > 0 && <p>{totalCost.e} Exalted</p>}
					{totalCost.d > 0 && <p>{totalCost.d} Divine</p>}
				</div>
			</div>
		</section>
	)
}