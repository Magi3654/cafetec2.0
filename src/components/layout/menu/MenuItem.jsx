import { CartContext } from '@/components/AppContext';
import MenuItemTile from "@/components/layout/menu/MenuItemTile";
import Image from 'next/image';
import toast from 'react-hot-toast';
import React, { useContext, useState } from 'react'

export default function MenuItem(menuItem) {
  const {image, name, description, basePrice, sizes, extraIngredientPrices,} = menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0]|| null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);

    setShowPopup(false);
    toast.success('Agregado al carrito');
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;

    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    }

    else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice; 
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div 
          onClick={() => setShowPopup(false)}
          className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div 
            onClick={ev => ev.stopPropagation()}
            className='my-8 bg-white p-2 rounded-lg max-w-md'>
            <div className='overflow-y-scroll p-2' style={{maxHeight:'calc(100vh - 100px)'}}> 

              <Image src={image} alt={name} width={300} height={200} className='mx-auto'/>
              <h2 className='text-lg font-bold text-center mb-4'>{name}</h2>
              <p className='text-center text-darkGray text-sm mb-2'>{description}</p>
              {sizes?.length > 0 && (
                <div className='p-2'>
                  <h3 className='text-center text-darkGray'>Pick your size</h3>
                  {sizes.map(size => (
                    <label key={size._id} className='flex items-center gap-1 p-3 border border-semiGray rounded-md mb-1'>
                      <input type='radio' name='size' checked={selectedSize?.name === size.name} onChange={() => setSelectedSize(size)}/>
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                
                  <div className='p-2'>
                    <h3 className='text-center font-medium m-2'>¿Algún extra?</h3>
                    {extraIngredientPrices.map(extraThing => (
                      <label key={extraThing._id} className='flex items-center gap-1 p-3 border border-semiGray rounded-md mb-1'>
                        <input type='checkbox' name={extraThing.name} onChange={ev => handleExtraThingClick(ev, extraThing)}/>
                        {extraThing.name} +${extraThing.price}
                      </label>
                    ))}
                  </div>
              )}
              <button className='bg-yellow sticky bottom-2' onClick={handleAddToCartButtonClick} type='button'>Add to cart {selectedPrice}</button>
              <button className='mt-2' onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem}></MenuItemTile>
    </>
  )
}
