interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition">
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-xl" />
      <div className="p-3">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="mt-2 font-semibold text-red-600">{product.price} ₺</p>
      </div>
    </div>
  );
}
