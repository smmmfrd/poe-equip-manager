import { forwardRef, useRef } from "react";

const ItemImporter = forwardRef(({newEquip}, ref) => {
    const equipInput = useRef(null);

    function close() {
        ref.current.close();
    }

    function handleSubmit() {
        const data = equipInput.current.value.split('\n')
            .filter((line) => line !== "")
            .filter((line, index) => index < 3);
        const item = {
            slot: data[0].replace('Item Class: ', ''),
            rarity: data[1].replace('Rarity: ', ''),
            name: data[2],
        }
        equipInput.current.value = "";
        newEquip(item);
        close();
    }

    return (
        <dialog ref={ref} className="rounded-2xl relative p-10">
            {/* CLOSE BUTTON */}
            <button className="btn btn-circle btn-outline btn-sm absolute top-1 left-1" onClick={close}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <textarea ref={equipInput} className="textarea textarea-bordered resize-none" cols="30" rows="10" onKeyDown={(e) => {
                if(e.key === "Enter") {
                    handleSubmit();
                }
            }}></textarea>
            <button className="btn btn-success block w-full mt-6" onClick={handleSubmit}>Submit Item (enter)</button>
        </dialog>
    );
});

export default ItemImporter;