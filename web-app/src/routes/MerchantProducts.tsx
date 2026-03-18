import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
}

const MerchantProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data.items);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await api.post("/products", {
        name,
        price: Number(price),
        stock: Number(stock)
      });
      setName("");
      setPrice("");
      setStock("0");
      await load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Manage Products</h1>

      <div className="border p-4 rounded space-y-2">
        <h2 className="font-semibold">Create Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            className="border px-2 py-1 rounded"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Stock"
            value={stock}
            onChange={e => setStock(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white rounded px-3 py-1 disabled:opacity-50"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Your Products</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MerchantProducts;

