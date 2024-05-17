'use client'
import {signOut, useSession} from "next-auth/react";
import {CartContext} from "@/components/AppContext";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

export default function(){
    const session = useSession();
    console.log(session);

    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    const {cartProducts} = useContext(CartContext);

    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return(
        <header className="flex items-center justify-between">
            <Image src={'/logo.png'} height={90} width={90} className="flex-none" alt={'logo'}/>
            
            <nav className="text-center flex-1 items-center gap-4 text-lightBrown font-semibold">
                <Link className='mx-2' href={'/'}>Home</Link>
                <Link className='mx-2' href={'/menu'}>Menu</Link>
                <Link className='mx-2' href={'/#about'}>About</Link>
            </nav>
            <nav className="flex items-center gap-8 font-semibold">
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'} className="text-sm whitespace-nowrap">Hello, {userName}!</Link>
                        <button onClick={() => signOut()} className="border border-gray shadow-md bg-yellow rounded-full text-white px-6 py-2">Cerrar sesión</button>
                    </>
                )}

                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'}>Iniciar sesión</Link>
                        <Link href={'/register'} className="border border-gray shadow-md bg-yellow rounded-full text-white px-6 py-2">Registrarse</Link>
                    </>
                )}

                <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
                
            </nav>

        </header>
    )

}