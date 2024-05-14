'use client'
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile"
import { useState } from "react";

export default function MenuItemsPage(){
    const [image, setImage]=useState('');
    const [name,setName]=useState('');
    const [description, setDescription]=useState('');
    const [basePrice, setPrice]=useState('');
    const {loading, data} = useProfile();

    async function handleFormSubmit(e){
        e.preventDefault();
        const data = {image, name, description,basePrice}
        fetch('/api/menu-items', {
            method: 'POST',
            body: JSON.stringify({
                image, name, description,basePrice 
            })
        })
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