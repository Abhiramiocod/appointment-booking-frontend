import { useEffect, useState } from "react";
import api from "../lib/api";
import {
  Loader2,
  Video,
  Cloud,
  Users,
  Monitor,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  ArrowUpRight,
  Unlink,
  Plug,
} from "lucide-react";
import Toast from "../components/Toast";
import {
  getGoogleCalendarStatus,
  getGoogleCalendarConnectUrl,
  disconnectGoogleCalendar,
} from "../api/googleCalendar";

interface Item {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  category: string;
  action: () => void;
}

export default function ConnectionsPage() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [gcalConnected, setGcalConnected] = useState(false);
  const [gcalEmail, setGcalEmail] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchGcalStatus = async () => {
    try {
      const data = await getGoogleCalendarStatus();
      setGcalConnected(data.connected);
      setGcalEmail(data.google_email);
    } catch (err) {
      console.error("Failed to load Google Calendar status", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await api.get("/user");
        await fetchGcalStatus();
      } catch (err) {
        console.error("Failed to load user info", err);
      } finally {
        setLoading(false);
      }
    };
    init();

    const params = new URLSearchParams(window.location.search);
    const calendarStatus = params.get("calendar_status");
    if (calendarStatus === "connected") {
      showToast("Google Calendar connected successfully.", "success");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (calendarStatus === "error") {
      showToast("We couldn't connect Google Calendar. Please try again.", "error");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleGcalClick = async () => {
    if (gcalConnected) {
      if (!window.confirm("Disconnect Google Calendar? Appointments will stop syncing.")) return;
      try {
        setActionLoading(true);
        const res = await disconnectGoogleCalendar();
        setGcalConnected(false);
        setGcalEmail(null);
        showToast(res.message || "Google Calendar disconnected.", "success");
      } catch (error: any) {
        showToast(error.response?.data?.message || "Failed to disconnect Google Calendar.", "error");
      } finally {
        setActionLoading(false);
      }
    } else {
      window.location.href = getGoogleCalendarConnectUrl();
    }
  };

  const items: Item[] = [
    {
      id: "outlook",
      name: "Outlook Calendar",
      description: "Add events to your desktop calendar and prevent double-booking.",
      icon: Monitor,
      iconBg: "bg-[#0078D4]/10",
      iconColor: "text-[#0078D4]",
      category: "Calendars",
      action: () => showToast("Outlook integration is coming soon.", "success"),
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Include Zoom details in your booking confirmations automatically.",
      icon: Video,
      iconBg: "bg-[#2D8CFF]/10",
      iconColor: "text-[#2D8CFF]",
      category: "Meetings",
      action: () => showToast("Zoom integration is coming soon.", "success"),
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Include Teams conferencing details in your booking confirmations.",
      icon: MessageSquare,
      iconBg: "bg-[#5B5FC7]/10",
      iconColor: "text-[#5B5FC7]",
      category: "Meetings",
      action: () => showToast("Teams integration is coming soon.", "success"),
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Accept payments and require deposits directly during the booking flow.",
      icon: CreditCard,
      iconBg: "bg-[#635BFF]/10",
      iconColor: "text-[#635BFF]",
      category: "Payments",
      action: () => showToast("Stripe integration is coming soon.", "success"),
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Create and update CRM records as appointments are booked.",
      icon: Cloud,
      iconBg: "bg-[#00A1E0]/10",
      iconColor: "text-[#00A1E0]",
      category: "CRM",
      action: () => showToast("Salesforce integration is coming soon.", "success"),
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Sync meeting data to your CRM with account-matched routing.",
      icon: Users,
      iconBg: "bg-[#FF7A59]/10",
      iconColor: "text-[#FF7A59]",
      category: "CRM",
      action: () => showToast("HubSpot integration is coming soon.", "success"),
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-medium text-slate-500">Loading your connections…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex-1 w-full">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {/* Header + stats strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-[30px] font-bold text-slate-900 tracking-tight">Connections</h1>
            <p className="text-[15px] text-slate-500 mt-2 leading-relaxed max-w-md">
              Your calendar, payments, and tools — all working together behind every booking.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3.5 min-w-[110px]">
              <p className="text-2xl font-bold text-slate-900">{gcalConnected ? 1 : 0}</p>
              <p className="text-[12px] text-slate-500 mt-0.5">Connected</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3.5 min-w-[110px]">
              <p className="text-2xl font-bold text-slate-900">{items.length + 1}</p>
              <p className="text-[12px] text-slate-500 mt-0.5">Available</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3.5 min-w-[110px]">
              <p className="text-2xl font-bold text-slate-900">4</p>
              <p className="text-[12px] text-slate-500 mt-0.5">Categories</p>
            </div>
          </div>
        </div>

        {/* Google Calendar spotlight */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-7 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-[17px] font-semibold text-slate-900">Google Calendar</h2>
                {gcalConnected && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 size={11} /> Connected
                  </span>
                )}
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {gcalConnected && gcalEmail ? (
                  <>
                    Syncing as <span className="text-slate-700 font-medium">{gcalEmail}</span> — new bookings
                    appear on your calendar automatically.
                  </>
                ) : (
                  "Connect once and every booking lands on your calendar — no manual entry, no double-booking."
                )}
              </p>
            </div>

            <div className="shrink-0">
              {gcalConnected ? (
                <button
                  type="button"
                  onClick={handleGcalClick}
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors disabled:opacity-50"
                >
                  <Unlink size={14} />
                  Disconnect
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGcalClick}
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm disabled:opacity-50"
                >
                  Connect
                  <ArrowUpRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Plug size={16} className="text-slate-400" />
            <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">
              More ways to connect
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="text-left bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.iconBg}`}>
                    <item.icon size={22} className={item.iconColor} />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mt-2">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-slate-900 mb-1.5">{item.name}</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-2 mt-auto border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[12px] text-slate-400">Not connected</span>
                  <span className="text-[13px] font-semibold text-indigo-600">Connect</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}