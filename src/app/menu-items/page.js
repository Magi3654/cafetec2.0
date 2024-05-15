'use client'
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile"
import { rejects } from "assert";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage(){
    const [image, setImage]=useState('');
    const [name,setName]=useState('');
    const [description, setDescription]=useState('');
    const [basePrice, setPrice]=useState('');
    const {loading, data} = useProfile();

    async function handleFormSubmit(e){
        e.preventDefault();
        const data = {image, name, description,basePrice}
        const savingPromise = new Promise(async(resolve, reject)=>{

            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            })
            if(response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise,{
            loading: 'Guardando producto',
            success: 'Guardado',
            error:'Ups surgio un error'
        });
    }

    if(loading){
        return 'Cargando Usuario';
    }
    if(!data.admin){
        return 'No eres administracion'; 
    }
    

    return(
        <section className="mt-8 max-x-md mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8">
                <div className="flex items-start gap-4">
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Nombre del elemento</label>
                        <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
                        <label>Descripcion</label>
                        <input type="text" value={description} onChange={e=>setName(e.target.value)}/>
                        <label>Precio</label>
                        <input type="text" value={basePrice} onChange={e=>setName(e.target.value)}/>
                        <button className="mb-2" type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        </section>
    )
}