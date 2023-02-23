import { useEffect, useReducer, useRef } from "react";
import EquipImporter from "./EquipImporter";

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
        default:
            console.log("unknown item in bagging area!");
            return state;
    }
}

export default function EquipManager({ currentCharacter }) {
    const [equips, dispatch] = useReducer(reducer, currentCharacter);
    const itemImporter = useRef(null);

    useEffect(() => {
        console.log(equips);
        localStorage.setItem("TEST CHARACTER", JSON.stringify({name: "TEST CHARACTER", ...equips}));
    }, [equips])

    function newEquip(equip) {
        dispatch({ slot: equip.slot, item: equip });
    }

    return (
        <>
            <button className="btn btn-primary" onClick={() => { itemImporter.current.showModal(); console.log("pressed me!") }}>Import Item (Ctrl + V)</button>
            <EquipImporter ref={itemImporter} newEquip={newEquip} />
            <div className="grid grid-cols-8 grid-rows-6 gap-4 [&>*]:w-16 [&>*]:h-16">
                <div className="">
                    <button className="btn btn-outline w-double h-quad">
                        Main Hand
                    </button>
                </div>
                <div className="col-start-4">
                    <button className="btn btn-outline w-double h-double">
                        Helmet
                    </button>
                </div>
                <div className="col-start-7">
                    <button className="btn btn-outline w-double h-quad">
                        Off Hand
                    </button>
                </div>
                <div className="row-start-3 col-start-4">
                    <button className="btn btn-outline w-double h-triple">
                        Body Armour
                    </button>
                </div>
                <div className="row-start-3 col-start-6">
                    <button className="btn btn-outline w-full h-full">
                        Amulet
                    </button>
                </div>
                <div className="row-start-4 col-start-3">
                    <button className="btn btn-outline w-full h-full">
                        Ring
                    </button>
                </div>
                <div className="row-start-4 col-start-6">
                    <button className="btn btn-outline w-full h-full">
                        Ring
                    </button>
                </div>
                <div className="row-start-5 col-start-2">
                    <button className="btn btn-outline w-double h-double">
                        Gloves
                    </button>
                </div>
                <div className="row-start-5 col-start-6">
                    <button className="btn btn-outline w-double h-double">
                        Boots
                    </button>
                </div>
                <div className="row-start-6 col-start-4">
                    <button className="btn btn-outline w-double h-full">
                        Belt
                    </button>
                </div>
            </div>
        </>
    );
}