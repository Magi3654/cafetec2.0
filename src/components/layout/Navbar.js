'use client'
import { CartContext } from "@/components/AppContext"
import { useSession } from "next-auth/react";
import { useContext } from "react";
import Link from "next/link";

export default function Navbar() {
    const session = useSession();
    console.log(session);

    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    const {cartProducts} = useContext(CartContext);

    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <nav className="flex items-center justify-around bg-white font-medium py-4 fixed bottom-0 rounded rounded-se-2xl rounded-ss-2xl left-0 right-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <Link className='mx-2' href={'/'}>Home</Link>
            <Link className='mx-2' href={'/menu'}>Menu</Link>
            <Link className='mx-2' href={'/payment'}>Método de Pago</Link>
            <Link className='mx-2' href={'/#about'}>About</Link>
        </nav>
    )
}