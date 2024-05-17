import { CartContext } from '@/components/AppContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import React, { useContext } from 'react'

export default function MenuItem(menuItem) {
  const {image, name, description, basePrice, sizes, extraIngredientPrices,} = menuItem
  const {addToCart} = useContext(CartContext);

  return (
    <div className="bg-babyYellow p-4 rounded-lg text-center" >
        <img src={image} alt="cheetos"/>
        <h4 className="font-semibold text-lg my-3">{name}</h4>
        <p className="text-sm max-h-[120px] truncate">{description}</p>
        <button onClick={() => addToCart(menuItem)} className="bg-yellow font-semibold rounded-2xl px-6 py-2 mt-3">
          Add to cart ${basePrice}
        </button>
    </div>
  )
}
