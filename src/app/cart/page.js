'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import AddressInputs from "@/components/layout/AddressInputs";
import { useContext, useEffect, useState } from "react";
import { UseProfile } from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
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

    async function handleCompra(ev) {
        ev.preventDefault();

        if (!selectedCard) {
            toast.error('Seleccione un método de pago');
            return;
        }

        else {
            toast.success('Compra realizada');
        }
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
                        <div className="flex items-center gap-4 my-3 py-4 px-2 rounded-lg shadow-lg shadow-slate-300">
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={''}/>
                            </div>
                            <div className="grow">
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                    
                                {product.size && (
                                    <div className="text-sm font-semibold text-darkGray">
                                        Tamaño: <span className="font-normal">{product.size.name}</span>
                                    </div>
                                )}

                                {product.extras?.length >0 && (
                                    <div className="text-sm font-semibold text-darkGray">
                                        Extras: {product.extras.map(extra => (
                                            <div className="font-normal">{extra.name} ${extra.price}</div>
                                        ))}
                                    </div>
                                )}

                            </div>
                                
                            <div className="flex flex-col justify-center align-middle text-center">
                                <button 
                                    type = "button"
                                    onClick={() => removeCartProduct(index)}
                                    className="flex mb-3">
                                    <XMarkIcon className="size-6 text-center bg-yellow rounded-md text-white"/>
                                </button>
                                
                                
                                <div className="text-lg font-semibold">
                                    ${cartProductPrice(product)}
                                </div>
                                
                            </div>    
                        </div>
                    ))}

                </div>

                <div className="bg-white mt-4 p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <form onSubmit={handleCompra}>
                        <div className="grid grid-cols-2 mx-1 mb-5">
                            <h1 className="text-xl font-medium">Total</h1>
                            <h1 className="text-right text-2xl font-bold">${total}</h1>
                        </div>
                        <AddressInputs 
                            adressProps={address}
                            setAddressProps={handleAddressChange}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}/>
                        <button type="submit">Pagar</button>
                    </form>
                </div>
            </div>
        </section>
    );
}