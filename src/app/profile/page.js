'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { resolve } from "path";
import { rejects } from "assert";
import toast from "react-hot-toast";

export default function ProfilePage(){
    
    const session = useSession();
    const [userName, setUserName]= useState('')
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);

            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setCountry(data.country);
                })
            });
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
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });

    }

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setImage(link);
                    })
                }
                throw new Error('Something went wrong');
            });
            
            await toast.promise(uploadPromise, {
                uploading: 'Uploading...',
                success: 'Upload complete',
                error: 'Upload error',
            });
        }
    }

    if (status === 'loading'){
        return 'Cargando...';
    }
    if (status === 'unauthenticated'){
        return redirect ('/login');
    }


    return(
        <section className="mt-8">
            <h1 className="text-center text-yellow text-4xl mb-4">
                Perfil
            </h1>
            <div className="max-w-md mx-auto ">
                <div className="flex gap-4 items-center">
                    <div>
                        <div className=" p-2 rounded-lg relative max-w-[120px]">
                            {image && (
                                <Image className="rounded-lg w-full h-full" src={image} width={250} height={250} alt={'avatar'}/>
                            )}
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange}></input>
                                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>

                    <form className="grow flex flex-col" onSubmit={handleProfileInfoUpdate}>
                        <div className="flex flex-col m-1">
                            <label className="my-2 font-semibold text-sm">Nombre Completo</label>
                            <input type="text" placeholder="Nombre Completo" className="rounded-md bg-gray py-2 px-4 my-2"
                                value={userName} onChange={ev => setUserName(ev.target.value)}/>
                        </div>

                        <div className="flex flex-col m-1">
                            <label className="my-2 mr-3 font-semibold">Email</label>
                            <input type="email" disabled={true} className="rounded-md bg-gray py-2 px-4 my-2"
                                value={session.data.user.email} placeholder="email"></input>
                        </div>

                        <div className="flex flex-col m-1">

                            <label className="my-2 mr-3 font-semibold">Phone Number</label>
                            <input type="tel" disabled={true} className="rounded-md bg-gray py-2 px-4 my-2"
                                value={phone} placeholder="Phone Number" onChange={ev => setPhone(ev.target.value)}></input>
                        </div>

                        <div className="flex flex-col m-1">
                            <label className="my-2 mr-3 font-semibold">Country</label>
                            <input type="text" disabled={true} className="rounded-md bg-gray py-2 px-4 my-2"
                                value={country} placeholder="Country" onChange={ev => setCountry(ev.target.value)}></input>
                        </div>

                        <button type="submit">Guardar cambios</button>
                    </form>
                </div>
            </div>
        </section>
    )
}