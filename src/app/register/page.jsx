'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true)
        setError(false)
        setUserCreated(false)

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            setUserCreated(true);
        }

        else {
            setError(true);
        }

        setCreatingUser(false)

    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-2xl font-bold my-2">Crea una cuenta</h1>
            
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br/> Now you can{''} <Link className='underline' href={'/login'}>Login</Link>
                </div>
            )}

            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br/> Please try again later
                </div>
            )}

            <form className="flex flex-col mx-8" onSubmit={handleFormSubmit}>

                <label className="font-semibold text-sm">Correo electrónico</label>
                <input type="email" placeholder="correo electrónico" className="rounded-md bg-gray py-2 px-4 my-2" value={email} disabled={creatingUser} onChange={ev => setEmail(ev.target.value)}></input>

                <label className="font-semibold text-sm mt-4">Contraseña</label>
                <input type="password" placeholder="contraseña" className="rounded-md bg-gray py-2 px-4 my-2" value={password} disabled={creatingUser} onChange={ev => setPassword(ev.target.value)}></input>

                <button type="submit" className="my-4 py-2 px-4 rounded-md bg-yellow text-white font-semibold text-xl" disabled={creatingUser}>Registrarse</button>
                
                <div className="my-4 text-center text-darkGray">o</div>
                
                <button type="button" onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center my-4 py-2 px-4 rounded-md border border-darkGray font-semibold text-lg">
                    <Image src={'/google.png'} alt={''} width={24} height={24} className="pt-1"></Image>
                    Inicio con Google
                </button>
                
                <div className="text-center my-4 text-darkGray border-t pt-4">
                    <span className="font-light">¿Ya tienes una cuenta?</span>
                    <Link href={'/login'} className="underline mx-2 text-bold">
                        Inicia sesión aquí
                    </Link>
                </div>
            </form>
        </section>
    );
}