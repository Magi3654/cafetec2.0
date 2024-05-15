'use client'
import { UseProfile } from "@/components/UseProfile";
import Image from "next/image";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from '@/components/icons/Right'
import { useEffect, useState } from "react";

export default function MenuItemsPage(){

    const {loading, data} = UseProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, [])

    if (loading){
        return 'Cargando información de usuario...';
    }

    if (!data.admin){
        return 'No eres administrador.'; 
    }
    

    return(
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link href={'/menu-items/new'} className="button">
                    Crear producto
                    <Right/>
                </Link>
            </div>

            <div>
                <h1 className="font-semibold text-sm mt-8 mb-2">Editar producto:</h1>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link key={item._id} href={'/menu-items/edit/'+item._id} className="bg-gray rounded-lg p-4">
                            <div className="relative">
                                <Image src={item.image} alt={''} width={200} height={200} className="rounded-md"></Image>
                            </div>

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