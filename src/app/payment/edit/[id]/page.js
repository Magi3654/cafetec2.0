'use client'
import DeleteButton from "../../../../components/DeleteButton";
import { UseProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/UserTabs";
import CardForm from "@/components/layout/CardForm"
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Left from '@/components/icons/Left'
import Link from "next/link";
import toast from "react-hot-toast";

export default function EditCardPage() {
    const {id} = useParams();

    const [cards, setCards] = useState(null);
    const [redirectToCards, setRedirectToCards] = useState(false);
    const {loading, data} = UseProfile();

    useEffect(() => {
        fetch('/api/payment').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setCards(item);
            });
        })
    }, []);

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = {...data, _id:id};

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/payment', {
                method: 'PUT',
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
            error: 'Error'
        });

        setRedirectToCards(true);
    }

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/payment?_id='+id, {
                method: 'DELETE',
            });

            if (res.ok) {
                resolve();
            }

            else {
                reject();
            }
        });

        await toast.promise(promise, {
            loading: 'Eliminando...',
            success: 'Tarjeta eliminada',
            error: 'Error',
        });

        setRedirectToCards(true);
    }

    if (redirectToCards) {
        return redirect('/payment');
    }

    if (loading) {
        return 'Cargando usuario...';
    }

    if (!data.admin) {
        return 'No eres administrador.';
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-2xl mx-auto mt-8 rounded-lg border border-gray shadow-md">
                <Link href={'/payment'} className="button">
                    <Left></Left>
                    <span>Listado de tarjetas</span>
                </Link>
            </div> 
            <CardForm cards={cards} onSubmit={handleFormSubmit} />
            <div className='max-w-md mx-auto mt-4'>
                <div className='max-w-xs ml-auto pl-4'>
                    <DeleteButton 
                        label="Eliminar producto"
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    )
}