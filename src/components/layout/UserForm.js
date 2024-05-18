'use client'
import EditableImage from "@/components/layout/EditableImage";
import {UseProfile} from "@/components/UseProfile";
import { useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({user, onSave}) {
    console.log(user);
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.phone || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = UseProfile();

    function handleAddressChange(propName, value){
        if(propName === 'phone') setPhone(value);
        if(propName === 'streetAddress') setStreetAddress(value);
        if(propName === 'postalCode') setPostalCode(value);
        if(propName === 'city') setCity(value);
        if(propName === 'country') setCountry(value);

    }


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

               <AddressInputs adressProps={{
                phone, streetAddress, postalCode, city, country}}
                setAddressProps={handleAddressChange}/>
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
              
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}