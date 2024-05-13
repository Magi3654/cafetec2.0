'use client'
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import{useSession} from "next-auth/react";
export default function ProfilePage(){
    
    const session = useSession();
    const[userName, setUserName]= useState(session.data.user.name||'')
    const {status} = session;

    async function handleProfileInfoUpdate(e){
        e.preventDefault();
        const response = await fetch('/api/profile',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringfy({name:userName}),
        });
    }

    if (status === 'loading'){
        return 'Cargando...';
    }
    if (status === 'unauthnticated'){
        return redirect ('/login');
    } 
    const userImage = session.data.user.image;


    return(
        <section className="mt-8">
            <h1 className="text-center text-yellow text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto ">
                <div className="flex gap-4 items-center">
                    <div>
                        <div className=" p-2 rounded-lg relative">
                            <Image className="rounded-lg w-full h-full" src={userImage} width={250} height={250} alt={'avatar'}/>
                            <button type="button">Editar Perfil</button>
                        </div>
                    </div>
                    <form className="grow" onSubmit={'handleProfileInfoUpdate'}>
                        <input type="text" placeholder="Nombre Completo" 
                        value={userName} onChange={e=> setUserName(e.target.value)}/>
                        <input type="email"  disabled={true} value={"session.data.user.email"}></input>
                        <button type="submit">Guardar cambios</button>
                    </form>
                </div>

            </div>
        </section>
    )
}