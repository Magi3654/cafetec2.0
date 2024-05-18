export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, description, name, basePrice, sizes, extraIngredientPrices} = item;

    return (
        <div className="bg-babyYellow p-4 rounded-lg text-center" >
            <img src={image} alt="cheetos"/>
            <h4 className="font-semibold text-lg my-3">{name}</h4>
            <p className="text-sm max-h-[120px] truncate">{description}</p>
            <button onClick={onAddToCart} className="bg-yellow font-semibold rounded-2xl px-6 py-2 mt-3">
                Add to cart ${basePrice}
            </button>
        </div>
    );
}