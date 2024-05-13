'use client'
import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";
import{useSession} from "next-auth/react";

export default function ProfilePage(){
    
    const session = useSession();
    const [userName, setUserName]= useState('')
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);

            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setpostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                })
            })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(e){
        e.preventDefault();
        const response = await fetch('/api/profile',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringfy({name:userName}),
        });
    }

    if (status === 'loading'){
        return 'Cargando...';
    }
    if (status === 'unauthnticated'){
        return redirect ('/login');
    } 
    const userImage = session.data.user.image;


    return(
        <section className="mt-8">
            <h1 className="text-center text-yellow text-4xl mb-4">
                Perfil
            </h1>
            <div className="max-w-md mx-auto ">
                <div className="flex gap-4 items-center">
                    <div>
                        <div className=" p-2 rounded-lg relative">
                            <Image className="rounded-lg w-full h-full" src={userImage} width={250} height={250} alt={'avatar'}/>
                            <button type="button">Editar Perfil</button>
                        </div>
                    </div>

                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label className="my-2">Nombre Completo</label>
                        <input type="text" placeholder="Nombre Completo" 
                            value={userName} onChange={ev => setUserName(ev.target.value)}/>

                        <label className="my-2">Email</label>
                        <input type="email" disabled={true}
                            value={session.data.user.email} placeholder="email"></input>

                        <label className="my-2">Phone Number</label>
                        <input type="tel" disabled={true}
                            value={phone} placeholder="Phone Number" onChange={ev => setPhone(ev.target.value)}></input>

                        <label className="my-2">Street Address</label>
                        <input type="text" disabled={true}
                            value={streetAddress} placeholder="Street Address" onChange={ev => setStreetAddress(ev.target.value)}></input>
                            
                        <div className="flex gap-2">
                            <div>
                                <label className="my-2">Postal Code</label>
                                <input type="text" disabled={true}
                                    value={postalCode} placeholder="Postal Code" onChange={ev => setpostalCode(ev.target.value)}></input>
                            </div>

                            <div>
                                <label className="my-2">City</label>
                                <input type="text" disabled={true}
                                    value={city} placeholder="City" onChange={ev => setCity(ev.target.value)}></input>
                            </div>
                        </div>

                        <label className="my-2">Country</label>
                        <input type="text" disabled={true}
                            value={country} placeholder="Country" onChange={ev => setCountry(ev.target.value)}></input>

                        <button type="submit">Guardar cambios</button>
                    </form>
                </div>
            </div>
        </section>
    )
}