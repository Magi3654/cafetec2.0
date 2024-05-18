export default function AddressInputs({adressProps, setAddressProps}){
    const {phone, streetAddress, postalCode, city,country} = adressProps;

    return(
        <>
        
         <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">Número de teléfono</label>
                    <input type="tel" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={phone} placeholder="Phone Number" onChange={ev => setAddressProps('phone', ev.target.value)}></input>
        </div>
        <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">Direccion</label>
                    <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={streetAddress} placeholder="Direccion" onChange={ev => setAddressProps('streetAddress', ev.target.value)}></input>
        </div>
        <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">Codigo Postal</label>
                    <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={postalCode} placeholder="Codigo postal" onChange={ev => setAddressProps('postalCode', ev.target.value)}></input>
        </div>
        <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">Ciudad</label>
                    <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={city} placeholder="Ciudad" onChange={ev => setAddressProps('city', ev.target.value)}></input>
        </div>
        <div className="flex flex-col m-1">
                    <label className="font-semibold text-sm">País</label>
                    <input type="text" className="rounded-md text-sm font-medium bg-gray py-2 px-4 my-2"
                            value={country} placeholder="Pais" onChange={ev => setAddressProps('country', ev.target.value)}></input>
        </div>
        </>

    )
}
