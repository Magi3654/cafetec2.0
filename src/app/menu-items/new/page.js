'use client'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";

export default function MenuItemsPage(){
    const {loading, data} = useProfile();

    if(loading){
        return 'Cargando Usuario';
    }

    if(!data.admin){
        return 'No eres administracion'; 
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
        </section>
    )
}