import { formatTimeAgo } from "./utils";

export default function CharacterData({ data }) {
	const { name: characterName, dateCreated, ...equips } = data;

	const totalCost = Object.keys(equips).reduce((total, key) => {
		const equipCost = equips[key].cost
		total[equipCost.currency] += parseInt(equipCost.amount);
		return total;
	}, {a: 0, c: 0, e: 0, d: 0});

	return (
		<div className="w-11/12 p-4 mb-28 bg-primary rounded-lg text-secondary">
			<h2 className="text-4xl underline">{characterName}</h2>
			<p>Created - {formatTimeAgo(dateCreated)}</p>
			<h3 className="text-2xl underline">Total Cost</h3>
			{totalCost.a > 0 && <p>{totalCost.a} Alch</p>}
			{totalCost.c > 0 && <p>{totalCost.c} Chaos</p>}
			{totalCost.e > 0 && <p>{totalCost.e} Exalted</p>}
			{totalCost.d > 0 && <p>{totalCost.d} Divine</p>}
		</div>
	)
}