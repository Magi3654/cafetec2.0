'use client'
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";

export default function(){
<<<<<<< HEAD
    const session = useSession();
    console.log(session);
    const status = session.status;

=======
    /* logica de profile 
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    if (userName && userName.includes('')){
        userName = userName.split('')[0];
    }
*/
>>>>>>> fcab3f8299fe34dde6d165844d548c634d0c41f3
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
<<<<<<< HEAD
                {status === 'authenticated' && (
                    <button onClick={() => signOut()} className="bg-yellow rounded-full text-white px-8 py-2">Logout</button>
                )}

                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'} className="bg-yellow rounded-full text-white px-8 py-2">Register</Link>
                    </>
                )}
=======
                <>
                    <Link href={'/profile'}>{'userName'}</Link>
                </>
                
                <Link href={'/login'}>Login</Link>
                <Link href={'/register'} className="bg-yellow rounded-full text-white px-8 py-2">Register</Link>
>>>>>>> fcab3f8299fe34dde6d165844d548c634d0c41f3
            </nav>

        </header>
    )

}