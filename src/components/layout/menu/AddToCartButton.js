export default function AddToCartButton({
    hasSizesOrExtras, onClick, basePrice

}){
    return (
        <button onClick={onClick} className="bg-yellow font-semibold rounded-2xl px-6 py-2 mt-3">
                {(hasSizesOrExtras) ? (
                    <span>Add to cart (from ${basePrice})</span>
                ) : (
                    <span>Add to cart ${basePrice}</span>
                )}
            </button>
    )
}
