'use client';
import { useState } from "react";
import Image from "next/image";
import {signIn} from "next-auth/react"
import { ok } from "assert";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl: '/'});

        setLoginInProgress(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-2xl font-bold my-2">Login</h1>
            <form className="flex flex-col max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" className="rounded-md bg-gray py-2 px-4 m-2" value={email} disabled={loginInProgress} onChange={ev => setEmail(ev.target.value)}></input>

                <input type="password" name="password" placeholder="password" className="rounded-md bg-gray py-2 px-4 m-2" value={password} disabled={loginInProgress} onChange={ev => setPassword(ev.target.value)}></input>

                <button type="submit" className="m-2 py-2 px-4 rounded-md bg-yellow text-white font-semibold text-xl">Login</button>

                <div className="my-4 text-center text-darkGray">or login with provider</div>
                
                <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})} className="flex gap-4 justify-center m-2 py-2 px-4 rounded-md border border-darkGray font-semibold text-lg">
                    <Image src={'/google.png'} alt={''} width={24} height={24} className="pt-1"></Image>
                    Login with Google
                </button>
            </form>
        </section>
    )
}