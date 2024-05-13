'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import{useSession} from "next-auth/react";


export default function ProfilePage(){
    
    const session = useSession();
    console.log(session);
    const[userName, setUserName]= useState('');
    const[image, setImage]= useState('');
    const [saved, setSaved]= useState(false);
    const [isSaving, setIsSaving]= useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [sessioon, status]);

    async function handleProfileInfoUpdate(e){
        e.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringfy({name:userName,image}),
        });
        setIsSaving(false);
        if (response.ok){
            setSaved(true)
        }
    }

    async function handleFileChange(e){
        const files = e.target.files;
        if(files?.length === 1){
            const data = new FormData;
            data.set('file',files[0]);
            setIsUploading(true);
            const response = await fetch('/api/upload',{
                method: 'POST',
                body: data,
                
            });
            const link = await response.json();
            setImage(link)
            setIsUploading(false)
        }
    }
    if (status === 'loading'){
        return 'Cargando...';
    }
    if (status === 'unauthnticated'){
        return redirect ('/login');
    } 



    return(
        <section className="mt-8">
            <h1 className="text-center text-yellow text-4xl mb-4">
                Perfil
            </h1>
            <div className="max-w-md mx-auto ">
                {
                    saved && (

                        <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300 ">Perfil actualizado</h2>
                    )
                }
                {isSaving && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300 ">Guardando Cambios ...</h2>
                    
                )

                }
                {
                    isSaving &&(
                        <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300 ">Actualizando...</h2>
                    )
                }
                <div className="flex gap-4 items-center">
                    <div>
                        <div className=" p-2 rounded-lg relative max-w[120px]">
                            {
                                image&&(
                                    <Image className="rounded-lg w-full h-full" src={image} 
                                    width={250} height={250} alt={'avatar'}/>
                                
                            )}
                            <label >
                                <input type="file"  className="hidden" onChange={handleFileChange}/>
                                <span className="block border rounded-lg p-2 text-center border-brown cursor-pointer">Editar</span>
                            </label>
        
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="Nombre Completo" 
                        value={userName} onChange={e=> setUserName(e.target.value)}/>
                        <input type="email"  disabled={true} value={'session.data.user.email'}></input>
                        <button type="submit">Guardar cambios</button>
                    </form>
                </div>

            </div>
        </section>
    )
}