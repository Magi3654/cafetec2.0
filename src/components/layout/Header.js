'use client'
import {signOut, useSession} from "next-auth/react";
import {CartContext} from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart"
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";

export default function() {
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
            <Image src={'/logo.png'} height={120} width={120} className="flex-none h-[80px] w-[80px] md:h-[130px] md:w-[130px] lg:h-[90px] lg:w-[90px]" alt={'logo'}/>
            
            <div className="flex flex-1 flex-col md:gap-8 md:justify-between md:flex-row w-full">

                <div className="flex items-end text-right my-2 mb-2 ml-auto">
                    {status === 'authenticated' && (
                        <>
                            <button onClick={() => signOut()} className="border border-gray text-sm shadow-md bg-yellow rounded-full text-white px-6 py-2 w-36">Cerrar sesión</button>
                        </>
                    )}

                    {status === 'unauthenticated' && (
                        <>
                            <Link href={'/login'}>Iniciar sesión</Link>
                            <Link href={'/register'} className="border border-gray shadow-md bg-yellow rounded-full text-white px-6 py-2">Registrarse</Link>
                        </>
                    )}
                </div>

                <div className="flex text-right justify-end mt-4">
                    <div className="mr-4">
                        <Link href={'/cart'} className="relative">
                            <ShoppingCart/>
                            <span className="absolute -top-4 -right-4 bg-yellow text-white text-xs py-2 px-2 rounded-full leading-3">
                                {cartProducts.length}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <nav className="flex items-center gap-8 font-semibold">
                
            </nav>

        </header>
    )

}