'use client'
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function(){
    const session = useSession();
    console.log(session);

    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return(
        <header className="flex items-center justify-between">
            <Image src={'/logo.png'} height={75} width={75} className="flex-none" alt={'logo'}/>
            <Link className="text-brown font-semibold text-2xl" href={'/'}>
                cafetec
            </Link>
            <nav className="text-center items-center gap-4 text-lightBrown font-semibold">
                <Link className='mx-2' href={'/'}>Home</Link>
                <Link className='mx-2' href={''}>Menu</Link>
            </nav>
            <nav className="flex items-center gap-8 font-semibold">
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'} className="text-sm whitespace-nowrap">Hello, {userName}!</Link>
                        <button onClick={() => signOut()} className="bg-yellow rounded-full text-white px-8 py-2">Logout</button>
                    </>
                )}

                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'} className="bg-yellow rounded-full text-white px-8 py-2">Register</Link>
                    </>
                )}
            </nav>

        </header>
    )

}