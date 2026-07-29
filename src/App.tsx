import { Navigate, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import LoginCallback from "./pages/LoginCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifySuccess from "./pages/VerifySuccess";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/Admin/Dashboard";
import AdminAppointments from "./pages/Admin/Appointments";
import AdminStaff from "./pages/Admin/Staff/StaffsList";
import AdminStaffRequests from "./pages/Admin/Staff/StaffRequests";
import AdminCustomers from "./pages/Admin/Customers";
import AdminServices from "./pages/Admin/Services";
import AdminAnalytics from "./pages/Admin/Analytics";

import StaffSchedule from "./pages/Staff/Schedule";
import StaffServices from "./pages/Staff/Services";
import StaffReviews from "./pages/Staff/Reviews";
import StaffWorkingHours from "./pages/Staff/WorkingHours";

import StaffDashboard from "./pages/Staff/Dashboard";
import CustomerDashboard from "./pages/Customer/Dashboard";
import Register from "./pages/Register";

import StaffLayout from "./layouts/StaffLayout";

import StaffProfile from "./pages/Staff/Profile";
import StaffChangePassword from "./pages/Staff/ChangePassword";

import CustomerLayout from "./layouts/CustomerLayout";
import CustomerSchedule from "./pages/Customer/Schedule";
import CustomerBookAppointment from "./pages/Customer/BookAppointment";

import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-success" element={<VerifySuccess />} />


      {/* Admin Routes with Nested Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="appointments" element={<AdminAppointments />} />

        <Route path="staff">
          <Route index element={<AdminStaff />} />
          <Route path="requests" element={<AdminStaffRequests />} />
        </Route>
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Staff Routes with Nested Layout */}
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<StaffDashboard />} />
        <Route path="schedule" element={<StaffSchedule />} />
        <Route path="working-hours" element={<StaffWorkingHours />} />
        <Route path="services" element={<StaffServices />} />
        <Route path="reviews" element={<StaffReviews />} />
        <Route path="profile" element={<StaffProfile />} />
        <Route path="change-password" element={<StaffChangePassword />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Customer Routes with Nested Layout */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="schedule" element={<CustomerSchedule />} />
        <Route path="book" element={<CustomerBookAppointment />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
