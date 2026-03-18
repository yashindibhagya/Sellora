import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const { items, removeItem, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p>Your cart is empty.</p>
        <Link to="/products" className="text-blue-600 underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {items.map(item => (
        <div key={item.productId} className="flex justify-between border-b py-2">
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-600">
              ${item.price} × {item.quantity}
            </div>
          </div>
          <button
            className="text-red-600 text-sm"
            onClick={() => removeItem(item.productId)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="font-semibold">Total: ${total.toFixed(2)}</div>
        <div className="space-x-3">
          <button className="text-sm text-gray-600" onClick={clear}>
            Clear
          </button>
          <Link
            to="/checkout"
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

