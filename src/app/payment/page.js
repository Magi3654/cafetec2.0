'use client'
import Link from "next/link";
import Right from '@/components/icons/Right'
import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function PaymentPage() {

    const {loading, data} = UseProfile();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('/api/payment').then(res => {
            res.json().then(cards => {
                setCards(cards);
            });
        })
    }, [])

    if (loading){
        return 'Cargando información de usuario...';
    }

    if (!data.admin){
        return 'No eres administrador.'; 
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8 rounded-lg border border-gray shadow-md">
                <Link href={'/payment/new'} className="button">
                    Registrar Tarjeta
                    <Right/>
                </Link>
            </div>

            <div>
                <h1 className="font-semibold text-sm mt-8 mb-2">Editar tarjeta:</h1>
                <div className="grid grid-cols-3 gap-2">
                    {cards?.length > 0 && cards.map(item => (
                        <Link key={item._id} href={'/payment/edit/'+item._id} className="bg-gray rounded-lg p-4">
                            <div className="text-center">
                                <span className="text-sm font-normal text-black">{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}