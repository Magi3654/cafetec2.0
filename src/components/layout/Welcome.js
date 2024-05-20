'use client'
import {signOut, useSession} from "next-auth/react";
import {CartContext} from "@/components/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";

export default function Welcome() {
    const session = useSession();
    console.log(session);

    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;

    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <div className="flex flex-col w-full mx-auto my-5 md:my-6 text-left justify-start items-start">
            {status === 'authenticated' && (
                <>
                    <Link href={'/profile'} className="text-3xl md:text-5xl font-bold whitespace-nowrap">Hola, {userName}!</Link>
                    <span className="mx-1 text-left text-xs md:text-xl w-full">La cafetería siempre a tu alcance, entre clases.</span>
                    
                </>
            )}
        </div>
    );
}