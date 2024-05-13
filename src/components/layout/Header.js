'use client';

import{signOut, useSession} from "next-auth/react";
import Link from "next/link";


export default function Header(){
   
    /*//const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    if (userName && userName.includes('')){
        userName = userName.split('')[0];
    }
*/
    return(
        <header className="flex items-center justify-between">
            <Link className="text-brown font-semibold text-2xl" href={'/'}>
                cafetec
            </Link>
            <nav className="flex items-center gap-4 text-lightBrown font-semibold">
                <Link href={'/'}>Home</Link>
                <Link href={''}>Menu</Link>
            </nav>
            <nav className="flex items-center gap-8 font-semibold">
                <>
                    <Link href={'/profile'}>{'userName'}</Link>
                    <button 
                    onClick={()=>signOut()}
                    className="bg-yellow rounded-full text-white px-8 py-2">
                        Cerrar sesion
                    </button>
                </>
                
                <Link href={'/login'}>Login</Link>
                <Link href={'/register'} className="bg-yellow rounded-full text-white px-8 py-2">Register</Link>
            </nav>

        </header>
    )

}