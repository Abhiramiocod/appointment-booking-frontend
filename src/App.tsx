import { Navigate, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";

import AdminDashboard from "./pages/Admin/Dashboard";
import StaffDashboard from "./pages/Staff/Dashboard";
import CustomerDashboard from "./pages/Customer/Dashboard";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Role-based Dashboards */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/customer" element={<CustomerDashboard />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}