'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { resolve } from "path";
import { rejects } from "assert";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";
import { set } from "mongoose";
import EditableImage from "@/components/layout/EditableImage";

export default function ProfilePage(){
    
    const session = useSession();
    const [userName, setUserName] = useState('')
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetched, setProfileFetched]=useState(false)    
    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);

            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:userName,
                    image,
                    phone,
                    country,
                }),
            });

            if (response.ok) {
                resolve()
            }

            else {
                reject()
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Guardando...',
            success: 'Perfil guardado',
            error: 'Error',
        });

    }

    if (status === 'loading' || !profileFetched){
        return 'Cargando...';
    }
    if (status === 'unauthenticated'){
        return redirect ('/login');
    }


    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            
            <div className="max-w-md mx-auto mt-8 ">
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>

                    <form className="grow flex flex-col" onSubmit={handleProfileInfoUpdate}>
                        <div className="flex flex-col m-1">
                            <label className="font-semibold text-sm">Nombre de usuario</label>
                            <input type="text" placeholder="Nombre Completo" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                                value={userName} onChange={ev => setUserName(ev.target.value)}/>
                        </div>

                        <div className="flex flex-col m-1">
                            <label className="font-semibold text-sm">Correo electrónico</label>
                            <input type="email" disabled={true} className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                                value={session.data.user.email} placeholder="email"></input>
                        </div>

                        <div className="flex flex-col m-1">

                            <label className="font-semibold text-sm">Número de teléfono</label>
                            <input type="tel" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                                value={phone} placeholder="Phone Number" onChange={ev => setPhone(ev.target.value)}></input>
                        </div>

                        <div className="flex flex-col m-1">
                            <label className="font-semibold text-sm">País</label>
                            <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                                value={country} placeholder="Country" onChange={ev => setCountry(ev.target.value)}></input>
                        </div>

                        <button type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </section>
    )
}