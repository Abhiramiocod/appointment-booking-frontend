import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellDot, LogOut, User as UserIcon } from "lucide-react";
import api from "../../lib/api";

export default function AdminTopbar() {
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      const list = response.data?.data || response.data || [];
      setNotifications(list);
      setUnreadCount(list.filter((n: any) => !n.is_read).length);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await api.post("/notifications/read-all");
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.post(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleLogout = () => {
    console.log("🔐 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const userImageUrl = user?.image ?? "";

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e9e6f3",
        padding: "12px 32px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 5,
      }}
    >
      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 480,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#f5f2fe",
          border: "1px solid #e4e1ed",
          borderRadius: 10,
          padding: "8px 14px",
        }}
      >
        <span style={{ color: "#767586", fontSize: 14 }}>🔍</span>
        <input
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 13,
            color: "#464554",
            flex: 1,
          }}
          placeholder="Search appointments, clients..."
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginLeft: "auto",
        }}
      >
        {/* Bell Dot Notification Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-slate-100
              border border-slate-200
              text-indigo-600
              hover:bg-slate-200
              transition-colors
              cursor-pointer
              relative
            "
          >
            <BellDot size={20} strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden animate-scale-in">
              <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-sm font-bold text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider cursor-pointer hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs italic">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (!item.is_read) {
                          handleMarkAsRead(item.id);
                        }
                        if (item.action_url) {
                          navigate(item.action_url);
                        }
                        setShowNotifications(false);
                      }}
                      className={`p-3.5 hover:bg-slate-50/50 cursor-pointer transition-colors text-left flex items-start gap-2.5 ${!item.is_read ? "bg-indigo-50/10" : ""
                        }`}
                    >
                      {!item.is_read && (
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold text-slate-800 ${!item.is_read ? "font-bold" : ""}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                          {item.message}
                        </p>
                        <p className="text-[9px] text-slate-400 mt-1">
                          {new Date(item.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* View all link */}
              <div className="px-4 py-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/admin/notifications");
                  }}
                  className="w-full text-center text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer py-1"
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-3 px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-200/80 active:bg-slate-100 focus:outline-none">
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1e1b4b" }}>
                {user?.name || "Admin User"}
              </div>
            </div>

            {userImageUrl ? (
              <img
                src={userImageUrl}
                alt={user?.name || "User avatar"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover object-center border-2 border-gray-200 hover:border-indigo-500 transition-all duration-200"
                loading="eager"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const sibling = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (sibling) sibling.style.display = "flex";
                }}
              />
            ) : null}

            <div
              className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold border-2 border-indigo-200"
              style={{ display: userImageUrl ? "none" : "flex" }}
            >
              {user?.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <UserIcon size={18} />
              )}
            </div>
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-1 shadow-lg transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="px-3 py-2.5 border-b border-gray-50">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                Signed in as
              </p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || ""}
              </p>
            </div>

            <div className="p-1 border-b border-gray-50">
              <MenuItem>
                <button
                  onClick={() => navigate("/admin/profile")}
                  className="group flex w-full items-center gap-2 rounded-lg py-2 px-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-left font-medium"
                >
                  <UserIcon size={16} />
                  My Profile
                </button>
              </MenuItem>
            </div>

            <div className="p-1">
              <MenuItem>
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-2 rounded-lg py-2 px-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left font-medium"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </MenuItem>
            </div>

          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
