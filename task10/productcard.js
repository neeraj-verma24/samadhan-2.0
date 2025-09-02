function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-xs">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md mb-2"/>
      <h2 className="text-xl font-bold mb-1">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-blue-600">₹{product.price}</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;