import { formatTimeAgo } from "./utils";

export default function CharacterData({ equips }) {
	return (
		<div className="w-11/12 p-4 mb-28 bg-primary rounded-lg text-secondary">
			<h2 className="text-4xl underline">{equips.name}</h2>
			<p>Created - {formatTimeAgo(equips.dateCreated)}</p>
			<h3 className="text-2xl underline">Total Cost</h3>
			<p>1 Alch</p>
			<p>1 Chaos</p>
			<p>1 Exalted</p>
			<p>1 Divine</p>
		</div>
	)
}