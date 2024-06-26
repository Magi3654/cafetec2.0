'use client'
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import Left from '@/components/icons/Left'
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import DeleteButton from "../../../../components/DeleteButton";
import MenuItemForm from "../../../../components/layout/MenuItemForm";

export default function EditMenuItemPage() {

    const {id} = useParams();

    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = UseProfile();

    useEffect(() => {
       fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            });
       }) 
    }, []);

    async function handleFormSubmit(ev, data){
        ev.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'},
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
            success: 'Guardado',
            error: 'Error'
        });

        setRedirectToItems(true);

    }

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id='+id, {
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
            success: 'Producto eliminado',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
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
                <Link href={'/menu-items'} className="button">
                    <Left></Left>
                    <span>Listado de productos</span>
                </Link>
            </div> 
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
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