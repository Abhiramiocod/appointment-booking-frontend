import { useEffect, useState } from "react";
import api from "../lib/api";
import { Loader2 } from "lucide-react";
import ConnectedAccounts from "../components/Profile/ConnectedAccounts";
import Toast from "../components/Toast";

export default function ConnectionsPage() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        await api.get("/user");
      } catch (err) {
        console.error("Failed to load user info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={36} className="animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading connections...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Connections & Integrations</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Connect your external calendar and productivity services for automatic syncing.
        </p>
      </div>

      <ConnectedAccounts onShowToast={showToast} />
    </div>
  );
}
