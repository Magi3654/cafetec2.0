import AddToCartButton from "@/components/layout/menu/AddToCartButton"

export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, description, name, basePrice, sizes, extraIngredientPrices} = item;

    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0
    return (
        <div className="bg-babyYellow p-4 rounded-lg text-center" >
            <img src={image} alt="cheetos"/>
            <h4 className="font-semibold text-lg my-3">{name}</h4>
            <p className="text-sm max-h-[120px] truncate">{description}</p>
            <AddToCartButton hasSizesOrExtras={hasSizesOrExtras}
            onClick={onAddToCart}
            basePrice = {basePrice}/>
        </div>
    );
}