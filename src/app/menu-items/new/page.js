'use client'
import Left from '@/components/icons/Left'
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import { redirect } from 'next/dist/server/api-utils';
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast"

export default function NewMenuItemsPage(){

    const {loading, data} = UseProfile();
    const [redirectToItems, setRedirectToItems] = useState(false)

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
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
            loading: 'Guardando producto...',
            success: 'Producto guardado',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }
    
    if(loading){
        return 'Cargando información de usuario...';
    }

    if(!data.admin){
        return 'No eres administrador.'; 
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left/>
                    <span>Listado de productos</span>
                </Link>
            </div>
            <MenuItemForm/>
        </section>
    )
}