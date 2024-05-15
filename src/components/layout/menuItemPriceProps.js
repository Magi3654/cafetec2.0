'use client'
import Trash from "@/components/icons/Trash";
import ChevronDown from "@/components/icons/ChevronDown"
import ChevronUp from "@/components/icons/ChevronUp"

import { useState } from "react";

export default function MenuItemPriceProps({name, addLabel, props, setProps}) {
    
    const [isOpen, setIsOpen] = useState(false)

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
            <button type="button" onClick={() => setIsOpen(prev => !prev)} className="chevron">
                {isOpen && (
                    <ChevronUp/>
                )}

                {!isOpen && (
                    <ChevronDown/>
                )}
                <h3 className="font-semibold text-sm">{name}</h3>
                <h3 className="font-semibold text-sm">({props?.length})</h3>
            </button>
                
            <div className={isOpen ? 'block' : 'hidden'}>
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
        </div>

    );
}