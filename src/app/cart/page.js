'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import AddressInputs from "@/components/layout/AddressInputs";
import { useContext, useEffect, useState } from "react";
import { UseProfile } from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = UseProfile();

    useEffect(() => {
        if(profileData?.city) {
            const {phone, streetAddress, city, postalCode, country} = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            }
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    let total = 0 

    for (const p of cartProducts){
        total += cartProductPrice(p)
    }

    function handleAddressChange(propName, value){
        setAddress(prevAddress =>  ({...prevAddress, [propName]:value}))
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            <div className="mt-8 md:grid md:gap-8 md:grid-cols-2 flex flex-col">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>Carrito vacio</div>
                    )}

                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div className="flex items-center gap-4 mb-2 border-b py-4">
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={''}/>
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                    
                                {product.size && (
                                    <div className="text-sm">
                                        Tamaño: <span>{product.size.name}</span>
                                    </div>
                                )}

                                {product.extras?.length >0 && (
                                    <div className="text-sm text-semiGray">
                                        Extras: {product.extras.map(extra => (
                                            <div>{extra.name} ${extra.price}</div>
                                        ))}
                                    </div>
                                )}

                            </div>
                                
                            <div className="text-lg font-semibold">
                                ${cartProductPrice(product)}
                            </div>
                            
                            <div className="ml-2">
                                <button 
                                    type = "button"
                                    onClick={() => removeCartProduct(index)}
                                    className="p-2">
                                    <Trash/>
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="bg-white mt-4 p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <form>
                        <div className="grid grid-cols-2 mx-1">
                            <h1 className="text-xl font-medium ">Total</h1>
                            <h1 className="text-right text-2xl font-semibold">${total}</h1>
                        </div>
                        <AddressInputs adressProps={address}
                        setAddressProps={handleAddressChange}/>
                        <button type="submit">Pagar $ {total}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}