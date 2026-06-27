import { useCallback } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Index from "./pages/Index";
import LoginPage from "./pages/Login";

function IndexRoute() {
  const navigate = useNavigate();

  const goLogin = useCallback(() => {
    navigate("/login");
    window.scrollTo({ top: 0 });
  }, [navigate]);

  return <Index onLogin={goLogin} />;
}

function LoginRoute() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate("/");
    window.scrollTo({ top: 0 });
  }, [navigate]);

  return <LoginPage onBack={goBack} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}