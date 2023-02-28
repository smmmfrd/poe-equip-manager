export default function EquipViewer({ equipment }) {
    const { name: characterName, ...equips } = equipment;

    const EquipCard = (equipSlot) => {
        const equip = equips[equipSlot];
        equip.slot = equipSlot.charAt(0).toUpperCase() + equipSlot.slice(1);
        console.log(equip);
        return (
            <div className="bg-base-200 border border-base-content rounded p-2">
                {/* SLOT & NAME */}
                <h3 className="text-2xl font-semibold">
                    {equip.slot} - {equip.name}
                </h3>
                <div className="pr-8">
                    {Intl.DateTimeFormat('en-us').format(Date.parse(equip.date))} - {JSON.stringify(equip.cost)}
                </div>
            </div>
        );
    }

    return (
        <section className="w-full">
            <h2 className="text-center text-3xl font-bold underline">{characterName}'s Equips</h2>
            <div className="p-8 flex flex-col gap-4">
                {Object.keys(equips).map(EquipCard)}
            </div>
        </section>
    );
}