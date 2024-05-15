'use client'
import { UseProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { rejects } from "assert";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage(){
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const {loading, data} = UseProfile()

    async function handleFormSubmit(ev) {
        ev.preventDefault();

        const data = {image, name, description, basePrice,};

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                resolve();
            }

            else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving item...',
            success: 'Saved',
            error: 'Error',
        });
    }

    if(loading){
        return 'Loading user info...';
    }

    if(!data.admin){
        return 'No eres administrador.'; 
    }
    

    return(
        <section className="mt-8 max-x-md mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8 mx-8" onSubmit={handleFormSubmit}>
                <div className="grid items-start gap-4" style={{gridTemplateColumns: '.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>

                    <div className="grow flex flex-col">
                        <label className="font-semibold text-sm">Nombre del elemento</label>
                        <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2" value={name} onChange={ev => setName(ev.target.value)}/>
                        
                        <label className="font-semibold text-sm">Descripcion</label>
                        <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2" value={description} onChange={ev => setDescription(ev.target.value)}/>
                        
                        <label className="font-semibold text-sm">Precio</label>
                        <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2" value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/>
                        
                        <button className="mb-2" type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        </section>
    )
}