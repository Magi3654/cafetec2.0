'use client'
import EditableImage from "@/components/layout/EditableImage";
import { UseProfile } from "../UseProfile";
import { useState } from "react";

export default function UserForm({user, onSave}) {
    console.log(user);
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image ||'');
    const [phone, setPhone] = useState(user?.phone ||'');
    const [country, setCountry] = useState(user?.country || '');

    return(
        <div className="flex gap-4 items-center">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage}/>
                </div>
            </div>

            <form 
                className="grow flex flex-col" 
                onSubmit={ev => 
                    onSave(ev, {
                        name:userName,
                        image,
                        phone,
                        country,
                    })
                }
            >
                <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">Nombre de usuario</label>
                    <input type="text" placeholder="Nombre Completo" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={userName} onChange={ev => setUserName(ev.target.value)}/>
                </div>

                <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">Correo electrónico</label>
                    <input type="email" disabled={true} className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={user.email} placeholder="email"></input>
                </div>

                <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">Número de teléfono</label>
                    <input type="tel" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={phone} placeholder="Phone Number" onChange={ev => setPhone(ev.target.value)}></input>
                </div>

                <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">País</label>
                    <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={country} placeholder="Country" onChange={ev => setCountry(ev.target.value)}></input>
                </div>

                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}