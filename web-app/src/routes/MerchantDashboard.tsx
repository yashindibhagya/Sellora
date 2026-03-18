import React from "react";
import { Link } from "react-router-dom";

const MerchantDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
      <p className="text-gray-700">
        Manage your products and view orders for your store.
      </p>
      <div className="space-x-4">
        <Link className="text-blue-600 underline" to="/merchant/products">
          Manage Products
        </Link>
        <Link className="text-blue-600 underline" to="/merchant/orders">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default MerchantDashboard;

