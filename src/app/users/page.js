'use client'
import UserTabs from "@/components/layout/UserTabs"
import { useEffect, useState } from "react";
import { UseProfile } from "@/components/UseProfile";
import Link from "next/link";
export default function UsersPage(){

    const [users, setUsers] = useState([]);
    const {loading, data} = UseProfile();

    useEffect(()=>{
        fetch('/api/users').then(response =>{
            response.json().then(users=>{
                setUsers(users)
            })
        })
    },[])

    if (loading){
        return 'Cargando usurarios...'
    }

    if (!data.admin){
        return 'No eres un administrador'
    }


    return(
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                {users?.length>0 && users.map(user=>{
                    <div className="bg-gray rounded-lg mb-2 p-1 px-4 grid drid-cols-3 items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray">
                            {!!user.name && (<span>{user.name}</span>)}
                            {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray">{user.email}</span>
                        </div>
                        <div>
                            <Link href={'/users/'+ user._id} className="button">
                                Editar
                                </Link>
                        </div>
                    </div>
                })}
            </div>
        </section>
    )
}