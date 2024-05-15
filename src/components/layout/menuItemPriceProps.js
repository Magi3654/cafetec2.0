'use client'
import Trash from "@/components/icons/Trash";
import { useState } from "react";

export default function MenuItemPriceProps({name, addLabel, props, setProps}) {
    
    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name: '', price:0}]
        });
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    }

    return (
        <div className="bg-gray px-4 py-2 rounded-lg">
            <label className="font-semibold text-sm">{name}</label>
            {props?.length > 0 && props.map((size, index) => (
                <div className="flex items-end gap-2 my-3">
                    <div>
                        <label className="font-semibold text-xs">Nombre</label>
                        <input  type="text"
                            placeholder="Nombre tamaño"
                            value={size.name}
                            onChange={ev => editProp(ev, index, 'name')}
                            className="rounded-md text-sm font-medium bg-white py-2 px-4"
                        />     
                    </div>

                    <div>
                        <label className="font-semibold text-xs">Costo extra</label>
                        <input  type="text"
                            placeholder="0"
                            value={size.price}
                            onChange={ev => editProp(ev, index, 'price')}
                            className="rounded-md text-sm font-medium bg-white py-2 px-4"
                        />
                    </div>

                    <div>
                        <button type="button" onClick={() => removeProp(index)} className="bg-red-600 border text-white border-none text-sm"><Trash/></button>
                    </div>
                </div>
            ))}
            <button type="button" onClick={addProp} className="bg-white items-center">
                <span className="text-sm">{addLabel}</span>
            </button>
        </div>

    );
}