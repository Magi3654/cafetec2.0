'use client'
import EditableImage from "@/components/layout/EditableImage";
import {UseProfile} from "@/components/UseProfile";
import { useState } from "react";

export default function UserForm({user, onSave}) {
    console.log(user);
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = UseProfile();


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
                        admin,
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

                    {loggedInUserData.admin && (
                        <div>
                            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                                <input id="adminCb" type="checkbox" className="mr-2"
                                    value={'1'} checked={admin} onClick={ev => setAdmin(ev.target.checked)}
                                />
                                <span>Admin</span>
                            </label>
                        </div>
                    )}
                </div>
              
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}