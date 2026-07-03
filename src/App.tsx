import { Navigate, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminAppointments from "./pages/Admin/Appointments";
import AdminSchedule from "./pages/Admin/Schedule";
import AdminClients from "./pages/Admin/Clients";
import AdminAnalytics from "./pages/Admin/Analytics";
import AdminSettings from "./pages/Admin/Settings";

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

      {/* Admin Routes with Nested Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="schedule" element={<AdminSchedule />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Role-based Dashboards */}
      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/customer" element={<CustomerDashboard />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}