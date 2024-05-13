'use client'
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/useProfile";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { resolve } from "path";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast"

export default function EditMenuItemPage(){
// lo mismo que en Page 
    const {id} = useParams();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('') ;
    const [basePrice, setBasePrice]= useState('');
    const [redirectToItems, setRedirectToItems]= useState(false);
    const {loading, data}= useProfile();

    useEffect(()=>{
       fetch('/api/menu-items').then(res=>{
        res.json().then(items =>{
            const item = items.find(i=> i._id === id);
            setImage(item.image);
            setName(item.name);
            setDescription(item.description);
            setBasePrice(item.basePrice);
        });
       }) 
    }, []);


    async function handleFormSubmit(e){
        e.preventDefault();
        const data = {image, name, description, basePrice, _id:id};
        const savingPromise = new Promise(async(resolve, reject)=>{
            const response = await fetch('/api/menu-items',{
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'},

            });
            if(response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Guardando producto',
            success: 'Guardado',
            error: 'Error'
        });
        setRedirectToItems(true)

    }
    if(redirectToItems){
        return redirect('/menu-items');
    }
    if(loading){
        return 'Cargando usuario';
    }
    if(!data.admin){
        return 'No eres administrador';
    }
    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <span>Mostrar todo el menu</span>
                </Link>
            </div> 
            <form on onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div className="grid items-start gap-4"
                style={{gridTemplateColumns:'.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input
                        type="text"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        />
                        <label>Descipcion</label>
                        <input
                        type="text"
                        value={description}
                        onChange={e=>setName(e.target.value)}
                        />
                        <label>Precio</label>
                        <input
                        type="text"
                        value={basePrice}
                        onChange={e=>setName(e.target.value)}
                        />
                        <button type="submit">Guardar</button>
                    </div>
                </div>

            </form>

        </section>
    )
}   