'use client'
import Link from "next/link";
import toast from "react-hot-toast";
import Right from '@/components/icons/Right'
import Left from "@/components/icons/Left"
import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import CardForm from "@/components/layout/CardForm"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function NewCardPage() {
    const {loading, data} = UseProfile();
    const [cards, setCards] = useState([]);
    const [redirectToCards, setRedirectToCards] = useState(false);

    async function handleForm(ev, data) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/payment', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok) {
                resolve();
            }

            else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Guardando tarjeta...',
            success: 'Tarjeta guardada',
            error: 'Error',
        });

        setRedirectToCards(true)
    }

    if (redirectToCards) {
        return redirect('/payment');
    }

    if (loading) {
        return 'Cargando información de usuario...';
    }

    if(!data.admin){
        return 'No eres administrador.'; 
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-2xl mx-auto mt-8 rounded-lg border border-gray shadow-md">
                <Link href={'/payment'} className="button">
                    <Left/>
                    <span>Listado de tarjetas</span>
                </Link>
            </div>
            <CardForm card={null} onSubmit={handleForm}></CardForm>
        </section>
    );
}