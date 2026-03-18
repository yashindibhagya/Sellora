import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Sellora Marketplace</h1>
      <p className="mb-4 text-gray-700">
        Browse products, manage your store, and handle orders from a unified platform.
      </p>
      <div className="space-x-4">
        <Link className="text-blue-600 underline" to="/products">
          Browse Products
        </Link>
        <Link className="text-blue-600 underline" to="/merchant">
          Merchant Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;

