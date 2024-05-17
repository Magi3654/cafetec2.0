import { CartContext } from '@/components/AppContext';
import MenuItemTile from "@/components/layout/menu/MenuItemTile"
import Image from 'next/image';
import toast from 'react-hot-toast';
import React, { useContext, useState } from 'react'

export default function MenuItem(menuItem) {
  const {image, name, description, basePrice, sizes, extraIngredientPrices,} = menuItem
  const [showPopup, setShowPopup] = useState(false)
  const {addToCart} = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if (sizes.length === 0 && extraIngredientPrices.length === 0) {
      addToCart(menuItem);
      toast.success('Agregado al carrito');
    }

    else {
      setShowPopup(true);
    }
  }

  return (
    <>
      {showPopup && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='my-8 bg-white p-2 rounded-lg max-w-md'>
            <div className='overflow-y-scroll p-2' style={{maxHeight:'calc(100vh - 100px)'}}> 

              <Image src={image} alt={name} width={300} height={200} className='mx-auto'/>
              <h2 className='text-lg font-bold text-center mb-4'>{name}</h2>
              <p className='text-center text-darkGray text-sm mb-2'>{description}</p>
              {sizes?.length > 0 && (
                <div className='p-2'>
                  <h3 className='text-center text-darkGray'>Pick your size</h3>
                  {sizes.map(size => (
                    <label className='flex items-center gap-1 p-3 border border-semiGray rounded-md mb-1'>
                      <input type='radio' name='size'/>{size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className=''>
                  <div className='p-2'>
                    <h3 className='text-center text-darkGray'>Pick your size</h3>
                    {extraIngredientPrices.map(extraThing => (
                      <label className='flex items-center gap-1 p-3 border border-semiGray rounded-md mb-1'>
                        <input type='checkbox' name={extraThing.name}/>
                        {extraThing.name} +${extraThing.price}
                      </label>
                    ))}

                    <button className='bg-yellow' type='button'>Add to cart "Selected Price"</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem}></MenuItemTile>
    </>
  )
}
