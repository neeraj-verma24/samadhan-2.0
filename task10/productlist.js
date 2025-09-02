import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise-cancelling over-the-ear headphones.",
    price: 2999,
    image: "https://via.placeholder.com/200x160.png?text=Headphones"
  },
  {
    id: 2,
    name: "Fitness Tracker",
    description: "Track your health and steps daily.",
    price: 1499,
    image: "https://via.placeholder.com/200x160.png?text=Tracker"
  },
  {
    id: 3,
    name: "Smart Watch",
    description: "Stay updated and connected on your wrist.",
    price: 3999,
    image: "https://via.placeholder.com/200x160.png?text=Smart+Watch"
  }
];

function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
}

export default ProductList;