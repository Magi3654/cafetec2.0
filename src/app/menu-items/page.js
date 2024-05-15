'use client'
import { UseProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { rejects } from "assert";
import Link from "next/link";
import Right from '@/components/icons/Right'
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage(){
    const {loading, data} = UseProfile();

    if(loading){
        return 'Loading user info...';
    }

    if(!data.admin){
        return 'No eres administrador.'; 
    }
    

    return(
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link href={'/menu-items/new'} className="button">
                    Create New Menu Item
                    <Right/>
                </Link>
                
            </div>
        </section>
    )
}