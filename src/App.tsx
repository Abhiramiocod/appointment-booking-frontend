import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Public Pages
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const LoginCallback = lazy(() => import("./pages/LoginCallback"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const VerifySuccess = lazy(() => import("./pages/VerifySuccess"));
const Register = lazy(() => import("./pages/Register"));

// Layouts (can stay static or lazy)
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminAppointments = lazy(() => import("./pages/Admin/Appointments"));
const AdminStaff = lazy(() => import("./pages/Admin/Staff/StaffsList"));
const AdminStaffRequests = lazy(() => import("./pages/Admin/Staff/StaffRequests"));
const AdminCustomers = lazy(() => import("./pages/Admin/Customers"));
const AdminServices = lazy(() => import("./pages/Admin/Services"));
const AdminAnalytics = lazy(() => import("./pages/Admin/Analytics"));

// Staff Pages
const StaffDashboard = lazy(() => import("./pages/Staff/Dashboard"));
const StaffSchedule = lazy(() => import("./pages/Staff/Schedule"));
const StaffServices = lazy(() => import("./pages/Staff/Services"));
const StaffReviews = lazy(() => import("./pages/Staff/Reviews"));
const StaffWorkingHours = lazy(() => import("./pages/Staff/WorkingHours"));
const StaffChangePassword = lazy(() => import("./pages/Staff/ChangePassword"));

// Customer Pages
const CustomerDashboard = lazy(() => import("./pages/Customer/Dashboard"));
const CustomerSchedule = lazy(() => import("./pages/Customer/Schedule"));
const CustomerBookAppointment = lazy(() => import("./pages/Customer/BookAppointment"));

// Shared Pages
const Notifications = lazy(() => import("./pages/Notifications"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ConnectionsPage = lazy(() => import("./pages/ConnectionsPage"));

export default function App() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
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
          <Route path="connections" element={<ConnectionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Staff Routes with Nested Layout */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffDashboard />} />
          <Route path="schedule" element={<StaffSchedule />} />
          <Route path="working-hours" element={<StaffWorkingHours />} />
          <Route path="services" element={<StaffServices />} />
          <Route path="reviews" element={<StaffReviews />} />
          <Route path="connections" element={<ConnectionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="change-password" element={<StaffChangePassword />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Customer Routes with Nested Layout */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="schedule" element={<CustomerSchedule />} />
          <Route path="book" element={<CustomerBookAppointment />} />
          <Route path="connections" element={<ConnectionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
