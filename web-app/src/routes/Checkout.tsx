import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { api } from "../lib/api";

const Checkout: React.FC = () => {
  const { items, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        items: items.map(i => ({
          productId: i.productId,
          quantity: i.quantity
        }))
      };
      await api.post("/orders", payload);
      clear();
      setMessage("Order placed successfully.");
    } catch (e: any) {
      setMessage(e?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-gray-700">Confirm your order.</p>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        disabled={items.length === 0 || loading}
        onClick={handlePlaceOrder}
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default Checkout;

