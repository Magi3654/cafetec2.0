'use client'
import UserTabs from "@/components/layout/UserTabs";
import {UseProfile} from "@/components/UseProfile";
import UserForm from "../../../components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditUserPage(){

    const {loading, data} = UseProfile();
    const [user, setUser] = useState(null)
    const {id} = useParams();


    useEffect(()=>{
        fetch('/api/users').then(res=>{
           res.json().then(users =>{
            const user = users.find(u=> u._id === id);
            setUser(user)
           }) 
        })
    },[]);

 
    function handleSaveButtonClick(e, data){
        e.preventDefault();
        fetch('/api/profile'),{
            method : 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, id:id})
        }

    }

    if (loading){
        return 'Cargando perfil de usuario...'
    } 

    if(!data.admin){
        return 'No eres administrador.'
    }

    return(
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}