'use client'
import { CartContext } from "@/components/AppContext";
import Money from "@/components/icons/Money";
import Home from "@/components/icons/Home"
import Store from "@/components/icons/Store"
import User from "@/components/icons/User";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"
import { useContext } from "react";
import Link from "next/link";

export default function Navbar() {
    const session = useSession();
    const path = usePathname();
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
            <div className = {path === '/'  ? 'activeIcon' : 'navbar'}>
                <Home/>
                <Link href={'/'}>Home</Link>
            </div>

            <div className = {path.includes('/menu')  ? 'activeIcon' : 'navbar'}>
                <Store />
                <Link href={'/menu'}>Menú</Link>
            </div>

            <div className = {path.includes('/payment')  ? 'activeIcon' : 'navbar'}>
                <Money/>
                <Link href={'/payment'}>Tarjetas</Link>
            </div>

            <div className = {path.includes('/profile')  ? 'activeIcon' : 'navbar'}>
                <User />
                <Link href={'/profile'}>Perfil</Link>
            </div>
        </nav>
    )
}