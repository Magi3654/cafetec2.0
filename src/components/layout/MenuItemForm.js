import EditableImage from "@/components/layout/EditableImage"
import { useEffect, useState } from "react";
import MenuItemPriceProps from "./menuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '') ;
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '')
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, [])

    return (
        <form onSubmit={ev => onSubmit(ev, {image, name, description, basePrice, sizes, extraIngredientPrices, category,})} className="mt-8 max-w-2xl mx-auto">

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
                        className="input"
                    />

                    <label className="font-semibold text-sm">Descripción</label>
                    <input
                        type="text"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                        className="input"
                    />

                    <label className="font-semibold text-sm">Precio (mxn)</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                        className="input"
                    />

                    <label className="font-semibold text-sm">Categoría</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>

                    <div className="my-2">
                        <MenuItemPriceProps
                            name={'Tamaños'}
                            addLabel={'Agregar tamaño'}
                            props={sizes}
                            setProps={setSizes}
                        />
                    </div>

                    <div className="my-2">
                        <MenuItemPriceProps
                            name={'Ingredientes extras'}
                            addLabel={'Agregar precio de ingredientes'}
                            props={extraIngredientPrices}
                            setProps={setExtraIngredientPrices}
                        />
                    </div>
                    <button type="submit" className="border border-gray shadow-md ">Guardar</button>
                </div>
            </div>
        </form>
    );
}