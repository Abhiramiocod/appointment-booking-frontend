import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOut, User as UserIcon } from "lucide-react";

export default function AdminTopbar() {
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

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
        {/* User Profile Dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center focus:outline-none">
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
