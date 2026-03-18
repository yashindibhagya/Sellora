import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useCart } from "../context/CartContext";

interface Product {
  id: string;
  name: string;
  price: string;
  description?: string;
  imageUrl?: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    };
    fetchData();
  }, [id]);

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="w-full h-80 object-cover mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl mb-2">${product.price}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() =>
          addItem({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;

