import EditableImage from "@/components/layout/EditableImage"
import { useState } from "react";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '') ;
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');

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

                    <button type="submit">Guardar</button>
                </div>
            </div>
        </form>
    );
}