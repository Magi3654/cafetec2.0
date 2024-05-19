'use client'
import {signOut, useSession} from "next-auth/react";
import {CartContext} from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart"
import Menu from "@/components/icons/Menu"
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";

export default function() {
    // const [isOpen, setIsOpen] = useState(false);
    const session = useSession();
    console.log(session);

    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    const {cartProducts} = useContext(CartContext);

    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    /*
        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        }

        const handleLinkClick = () => {
            setIsOpen(false);
        }
    */

    return(
        <header className="flex items-center justify-between">
            <Image src={'/logo.png'} height={90} width={90} className="flex-none" alt={'logo'}/>

            
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

                <Link href={'/cart'} className="relative">
                    <ShoppingCart/>
                    <span className="absolute -top-2 -right-4 bg-yellow text-white text-xs py-1 px-1 rounded-full leading-3">
                        {cartProducts.length}
                    </span>
                </Link>
                
            </nav>

        </header>
    )

}