import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/products", { params: { page, search } });
      setProducts(res.data.data.items);
      setTotalPages(res.data.data.totalPages);
    };
    fetchData();
  }, [page, search]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Search products..."
          value={search}
          onChange={e => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="border rounded p-3">
            {p.imageUrl && (
              <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover mb-2" />
            )}
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm">${p.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Prev
        </button>
        <span className="px-2 py-1">
          Page {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

