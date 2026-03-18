import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: string;
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  status: string;
  totalPrice: string;
  items: OrderItem[];
}

const MerchantOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/orders");
      setOrders(res.data.data);
    };
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {orders.map(o => (
        <div key={o.id} className="border rounded p-3">
          <div className="flex justify-between mb-2">
            <div className="font-semibold">Order #{o.id.slice(0, 8)}</div>
            <div className="text-sm uppercase">{o.status}</div>
          </div>
          <div className="text-sm mb-2">Total: ${o.totalPrice}</div>
          <ul className="text-sm list-disc pl-5">
            {o.items.map(i => (
              <li key={i.id}>
                {i.product.name} × {i.quantity} @ ${i.unitPrice}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {orders.length === 0 && <p>No orders yet.</p>}
    </div>
  );
};

export default MerchantOrders;

