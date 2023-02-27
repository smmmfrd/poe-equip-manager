import { useRef } from "react";

export default function EquipImporter({ handleOpen, newEquip, buttonMessage }) {
    const inputModal = useRef(null);
    const equipInput = useRef(null);

    function open() {
        handleOpen();
        inputModal.current.showModal();
        equipInput.current.focus();
    }

    function close() {
        equipInput.current.value = "";
        inputModal.current.close();
    }

    function handleSubmit() {
        if (equipInput.current.value.split('\n').filter((line) => line !== "").length < 3) return;

        const data = equipInput.current.value.split('\n')
            .filter((line) => line !== "")
            .filter((line, index) => index < 3);
        const item = {
            slot: data[0].replace('Item Class: ', ''),
            rarity: data[1].replace('Rarity: ', ''),
            name: data[2],
        }
        newEquip(item);
        close();
    }

    return (
        <>
            <button className="btn btn-primary" onClick={open}>{buttonMessage}</button>

            <dialog ref={inputModal} className="rounded-2xl relative p-10">

                {/* CLOSE BUTTON */}
                <button className="btn btn-circle btn-outline btn-sm absolute top-1 left-1" onClick={close}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea ref={equipInput} className="textarea textarea-bordered resize-none" cols="30" rows="10" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }}></textarea>
                    <div className="flex gap-4">
                        <input type="number" defaultValue={1} className="input input-bordered" />
                        <select className="select select-bordered">
                            <option value="a">Alch</option>
                            <option value="c">Chaos</option>
                            <option value="e">Ex</option>
                            <option value="d">Div</option>
                        </select>
                    </div>
                    <button className="btn block w-full" type="submit">Submit Item (enter)</button>
                </form>
            </dialog>
        </>
    );
}