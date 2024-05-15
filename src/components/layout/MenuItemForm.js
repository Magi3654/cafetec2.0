import EditableImage from "@/components/layout/EditableImage"
import Trash from "@/components/icons/Trash"
import { useState } from "react";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '') ;
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState([]);

    function addSize() {
        setSizes(oldSizes => {
            return [...oldSizes, {name: '', price:0}]
        });
    }

    function editSize(ev, index, prop) {
        const newValue = ev.target.value;
        setSizes(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeSize(indexToRemove) {
        setSizes(prev => prev.filter((v, index) => index !== indexToRemove));
    }

    return (
        <form onSubmit={ev => onSubmit(ev, {image, name, description, basePrice})} className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4"
                style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div>
                    <EditableImage link={image} setLink={setImage}/>
                </div>

                <div className="grow flex flex-col">
                    <label className="font-semibold text-sm">Nombre del Producto</label>
                    <input
                        type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                    />

                    <label className="font-semibold text-sm">Descripción</label>
                    <input
                        type="text"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                        className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                    />

                    <label className="font-semibold text-sm">Precio (mxn)</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                        className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                    />

                    <div className="bg-gray px-4 py-2 rounded-lg">
                        <label className="font-semibold text-sm">Tamaño</label>
                        {sizes?.length > 0 && sizes.map((size, index) => (
                            <div className="flex items-end gap-2 my-3">
                                <div>
                                    <label className="font-semibold text-xs">Nombre tamaño</label>
                                    <input  type="text"
                                            placeholder="Nombre tamaño"
                                            value={size.name}
                                            onChange={ev => editSize(ev, index, 'name')}
                                            className="rounded-md text-sm font-medium bg-white py-2 px-4"
                                    />     
                                </div>

                                <div>
                                    <label className="font-semibold text-xs">Costo extra</label>
                                    <input  type="text"
                                            placeholder="0"
                                            value={size.price}
                                            onChange={ev => editSize(ev, index, 'price')}
                                            className="rounded-md text-sm font-medium bg-white py-2 px-4"
                                    />
                                </div>

                                <div>
                                    <button type="button" onClick={() => removeSize(index)} className="bg-red-600 border text-white border-none text-sm"><Trash/></button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addSize} className="bg-white items-center">
                            <span className="text-sm">Agregar</span>
                        </button>
                    </div>

                    <button type="submit">Guardar</button>
                </div>
            </div>
        </form>
    );
}