import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellDot,
  CheckCheck,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Bell,
  Info,
  CalendarCheck2,
  Star,
  AlertCircle,
} from "lucide-react";
import api from "../lib/api";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  action_url: string | null;
  is_read: boolean;
  created_at: string;
}

interface PaginatedMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

function getTypeIcon(type: string) {
  switch (type) {
    case "appointment":
      return <CalendarCheck2 size={16} />;
    case "review":
      return <Star size={16} />;
    case "alert":
      return <AlertCircle size={16} />;
    default:
      return <Info size={16} />;
  }
}

function getTypeColors(type: string) {
  switch (type) {
    case "appointment":
      return { bg: "#eef2ff", text: "#4f46e5", border: "#c7d2fe" };
    case "review":
      return { bg: "#fefce8", text: "#ca8a04", border: "#fde68a" };
    case "alert":
      return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
    default:
      return { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" };
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [meta, setMeta] = useState<PaginatedMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const [markingId, setMarkingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/notifications/all?page=${pageNum}`);
      const body = res.data;
      setNotifications(body.data || []);
      setMeta(body.meta || null);
    } catch {
      setError("Failed to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications(page);
  }, [page, fetchNotifications]);

  const handleMarkAllRead = async () => {
    try {
      setMarkingAll(true);
      await api.post("/notifications/read-all");
      fetchNotifications(page);
    } catch {
      // silently ignore
    } finally {
      setMarkingAll(false);
    }
  };

  const handleMarkAsRead = async (notification: Notification) => {
    // Optimistically mark as read in UI
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n))
    );

    if (!notification.is_read) {
      try {
        setMarkingId(notification.id);
        await api.post(`/notifications/${notification.id}/read`);
      } catch {
        // silently ignore
      } finally {
        setMarkingId(null);
      }
    }

    if (notification.action_url) {
      navigate(notification.action_url);
    } else if (notification.type === "appointment") {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      if (user?.role === "staff") navigate("/staff/schedule");
      else if (user?.role === "admin") navigate("/admin/appointments");
      else if (user?.role === "customer") navigate("/customer/schedule");
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div
      style={{
        padding: "28px 32px",
        flex: 1,
        minHeight: "100vh",
        background: "#fcf8ff",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
              flexShrink: 0,
            }}
          >
            <BellDot size={20} />
          </div>
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#1e1b4b",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              Notifications
            </h1>
            {meta && (
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, marginTop: 2 }}>
                {meta.total} total · Page {meta.current_page} of {meta.last_page}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Unread badge */}
          {!loading && unreadCount > 0 && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#eef2ff",
                border: "1px solid #c7d2fe",
                color: "#4338ca",
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <Bell size={12} />
              {unreadCount} unread
            </div>
          )}

          {/* Mark all read */}
          {unreadCount > 0 && (
            <button
              id="notifications-mark-all-read-btn"
              onClick={handleMarkAllRead}
              disabled={markingAll}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 16px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                cursor: markingAll ? "not-allowed" : "pointer",
                opacity: markingAll ? 0.7 : 1,
                boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {markingAll ? (
                <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <CheckCheck size={13} />
              )}
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 0",
            gap: 12,
          }}
        >
          <Loader2
            size={32}
            style={{ color: "#6366f1", animation: "spin 1s linear infinite" }}
          />
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
            Loading notifications…
          </p>
        </div>
      ) : error ? (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 16,
            padding: "20px 24px",
            color: "#dc2626",
            fontSize: 13,
          }}
        >
          ⚠️ {error}
        </div>
      ) : notifications.length === 0 ? (
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #e9e6f3",
            borderRadius: 20,
            padding: "80px 24px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "#f5f2fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a5b4fc",
              margin: "0 auto 16px",
            }}
          >
            <Bell size={28} />
          </div>
          <p style={{ color: "#64748b", fontSize: 15, fontWeight: 600, margin: 0 }}>
            You're all caught up!
          </p>
          <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 6 }}>
            No notifications to display.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          {notifications.map((item) => {
            const colors = getTypeColors(item.type);
            const isMarkingThis = markingId === item.id;

            return (
              <div
                key={item.id}
                id={`notification-item-${item.id}`}
                onClick={() => handleMarkAsRead(item)}
                style={{
                  background: item.is_read
                    ? "#fff"
                    : "linear-gradient(135deg, #fdfcff 0%, #f5f2fe 100%)",
                  border: item.is_read ? "1px solid #e9e6f3" : "1px solid #c7d2fe",
                  borderRadius: 16,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  cursor: "pointer",
                  transition: "all 0.18s",
                  boxShadow: item.is_read
                    ? "0 1px 4px rgba(0,0,0,0.04)"
                    : "0 3px 12px rgba(99,102,241,0.09)",
                  opacity: isMarkingThis ? 0.65 : 1,
                  position: "relative",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(99,102,241,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = item.is_read
                    ? "0 1px 4px rgba(0,0,0,0.04)"
                    : "0 3px 12px rgba(99,102,241,0.09)";
                }}
              >
                {/* Unread indicator dot */}
                {!item.is_read && (
                  <div
                    style={{
                      position: "absolute",
                      top: 18,
                      right: 18,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#6366f1",
                      boxShadow: "0 0 0 3px rgba(99,102,241,0.18)",
                    }}
                  />
                )}

                {/* Type icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {getTypeIcon(item.type)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: item.is_read ? 500 : 700,
                        color: "#1e1b4b",
                        margin: 0,
                        lineHeight: 1.4,
                        flex: 1,
                        minWidth: 0,
                        paddingRight: !item.is_read ? 20 : 0,
                      }}
                    >
                      {item.title}
                    </p>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      color: "#64748b",
                      margin: "4px 0 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.message}
                  </p>

                  {/* Badges */}
                  <div
                    style={{
                      marginTop: 9,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 9px",
                        borderRadius: 20,
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.type}
                    </span>
                    {!item.is_read && (
                      <span
                        style={{
                          padding: "2px 9px",
                          borderRadius: 20,
                          background: "#eef2ff",
                          color: "#4338ca",
                          border: "1px solid #c7d2fe",
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination ── */}
      {meta && meta.last_page > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid #e9e6f3",
            flexWrap: "wrap",
            gap: 12,
            width: "100%",
          }}
        >
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
            Showing{" "}
            <strong style={{ color: "#1e1b4b" }}>
              {meta.from}–{meta.to}
            </strong>{" "}
            of{" "}
            <strong style={{ color: "#1e1b4b" }}>{meta.total}</strong>{" "}
            notifications
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {/* Prev */}
            <button
              id="notifications-prev-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "7px 13px",
                borderRadius: 9,
                border: "1px solid #e9e6f3",
                background: page === 1 ? "#f8f9fa" : "#fff",
                color: page === 1 ? "#94a3b8" : "#1e1b4b",
                fontSize: 13,
                fontWeight: 600,
                cursor: page === 1 ? "not-allowed" : "pointer",
                transition: "all 0.15s",
              }}
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => {
              const isCurrent = p === page;
              const isNear =
                Math.abs(p - page) <= 2 || p === 1 || p === meta.last_page;

              if (!isNear) {
                const prevIsNear =
                  Math.abs(p - 1 - page) <= 2 ||
                  p - 1 === 1 ||
                  p - 1 === meta.last_page;
                if (prevIsNear) {
                  return (
                    <span
                      key={`ellipsis-${p}`}
                      style={{ color: "#94a3b8", fontSize: 13, padding: "0 2px" }}
                    >
                      …
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={p}
                  id={`notifications-page-${p}-btn`}
                  onClick={() => setPage(p)}
                  disabled={loading}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    border: isCurrent ? "none" : "1px solid #e9e6f3",
                    background: isCurrent
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "#fff",
                    color: isCurrent ? "#fff" : "#475569",
                    fontSize: 13,
                    fontWeight: isCurrent ? 700 : 500,
                    cursor: "pointer",
                    boxShadow: isCurrent
                      ? "0 3px 10px rgba(99,102,241,0.3)"
                      : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {p}
                </button>
              );
            })}

            {/* Next */}
            <button
              id="notifications-next-page-btn"
              onClick={() =>
                setPage((p) => Math.min(meta.last_page, p + 1))
              }
              disabled={page === meta.last_page || loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "7px 13px",
                borderRadius: 9,
                border: "1px solid #e9e6f3",
                background: page === meta.last_page ? "#f8f9fa" : "#fff",
                color: page === meta.last_page ? "#94a3b8" : "#1e1b4b",
                fontSize: 13,
                fontWeight: 600,
                cursor: page === meta.last_page ? "not-allowed" : "pointer",
                transition: "all 0.15s",
              }}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
