'use client'
import UserTabs from "@/components/layout/UserTabs";
import {UseProfile} from "@/components/UseProfile";
import UserForm from "../../../components/layout/UserForm";
import { useEffect } from "react";

export default function EditUserPage(){

    const {loading, data} = UseProfile();


    useEffect(()=>{
        fetch('/api/users').then(res=>{
           res.json().then(users =>{

           }) 
        })
    },[]);

    return id;

    if (loading){
        return 'Cargando perfil de usuario'
    } 

    if(!data.admin){
        return 'No eres administrador'
    }

    return(
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <UserForm user={null}/>
            </div>
        </section>
    )
}