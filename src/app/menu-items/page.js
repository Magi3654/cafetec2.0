'use client'
import { UseProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { rejects } from "assert";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage(){
    const [image, setImage] = useState('');
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setPrice] = useState('');
    const {loading, data} = UseProfile()

    if(loading){
        return 'Loading user info...';
    }

    if(!data.admin){
        return 'No eres administrador.'; 
    }
    

    return(
        <section className="mt-8 max-x-md mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8">
                <div className="flex items-start gap-4">
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>

                    <div className="grow flex flex-col">
                        <label className="font-semibold text-sm">Nombre del elemento</label>
                        <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2" value={name} onChange={ev => setName(ev.target.value)}/>
                        
                        <label className="font-semibold text-sm">Descripcion</label>
                        <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2" value={description} onChange={ev => setName(ev.target.value)}/>
                        
                        <label className="font-semibold text-sm">Precio</label>
                        <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2" value={basePrice} onChange={ev => setName(ev.target.value)}/>
                        
                        <button className="mb-2" type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        </section>
    )
}