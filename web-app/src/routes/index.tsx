import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "./Home";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import MerchantDashboard from "./MerchantDashboard";
import MerchantProducts from "./MerchantProducts";
import MerchantOrders from "./MerchantOrders";

const Protected: React.FC<{ roles?: ("CUSTOMER" | "MERCHANT" | "ADMIN")[]; children: React.ReactNode }> = ({
  roles,
  children
}) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <Protected roles={["CUSTOMER"]}>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected roles={["CUSTOMER"]}>
              <Checkout />
            </Protected>
          }
        />
        <Route
          path="/merchant"
          element={
            <Protected roles={["MERCHANT", "ADMIN"]}>
              <MerchantDashboard />
            </Protected>
          }
        />
        <Route
          path="/merchant/products"
          element={
            <Protected roles={["MERCHANT", "ADMIN"]}>
              <MerchantProducts />
            </Protected>
          }
        />
        <Route
          path="/merchant/orders"
          element={
            <Protected roles={["MERCHANT", "ADMIN"]}>
              <MerchantOrders />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

