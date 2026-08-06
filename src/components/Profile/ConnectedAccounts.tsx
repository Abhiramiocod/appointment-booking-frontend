import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle2, XCircle, RefreshCw, Unlink, ExternalLink } from "lucide-react";
import {
  getGoogleCalendarStatus,
  getGoogleCalendarConnectUrl,
  disconnectGoogleCalendar,
  type GoogleCalendarStatus,
} from "../../api/googleCalendar";

interface ConnectedAccountsProps {
  onShowToast?: (message: string, type: "success" | "error") => void;
}

export default function ConnectedAccounts({ onShowToast }: ConnectedAccountsProps) {
  const [status, setStatus] = useState<GoogleCalendarStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await getGoogleCalendarStatus();
      setStatus(data);
    } catch (error) {
      console.error("Failed to load Google Calendar status", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Check for calendar_status in URL parameters after redirect back from Google OAuth
    const params = new URLSearchParams(window.location.search);
    const calendarStatus = params.get("calendar_status");
    if (calendarStatus === "connected") {
      onShowToast?.("Google Calendar Connected successfully!", "success");
      // Clean query param
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (calendarStatus === "error") {
      onShowToast?.("Failed to connect Google Calendar. Please try again.", "error");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleConnect = () => {
    window.location.href = getGoogleCalendarConnectUrl();
  };

  const handleDisconnect = async () => {
    if (!window.confirm("Are you sure you want to disconnect Google Calendar?")) {
      return;
    }

    try {
      setActionLoading(true);
      const res = await disconnectGoogleCalendar();
      setStatus({ connected: false, google_email: null });
      onShowToast?.(res.message || "Google Calendar disconnected.", "success");
    } catch (error: any) {
      console.error("Failed to disconnect Google Calendar", error);
      onShowToast?.(error.response?.data?.message || "Failed to disconnect Google Calendar.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Connected Accounts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage external calendar sync for your appointments
            </p>
          </div>
        </div>

        <button
          onClick={fetchStatus}
          disabled={loading}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Refresh status"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">Google Calendar</span>
                {status?.connected ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 size={12} /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    <XCircle size={12} /> Not Connected
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {status?.connected && status.google_email ? (
                  <span>Connected as <strong className="text-slate-700 dark:text-slate-300">{status.google_email}</strong></span>
                ) : (
                  "Automatically sync booked appointments to your Google Calendar."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {status?.connected ? (
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={actionLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 transition-colors disabled:opacity-50"
              >
                <Unlink size={14} />
                Disconnect Google Calendar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConnect}
                disabled={actionLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
              >
                <ExternalLink size={14} />
                Connect Google Calendar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
