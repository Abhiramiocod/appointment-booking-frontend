import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../lib/Admin/navItems";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Colors } from "../../lib/utils";

export default function Navbar() {
  const location = useLocation();

  // Track expanded state for menu items
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Auto-expand active parent on load/route change
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children && location.pathname.startsWith(item.path)) {
        setExpanded((prev) => ({ ...prev, [item.path]: true }));
      }
    });
  }, [location.pathname]);

  const toggleExpand = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <nav style={{ flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const hasChildren = !!item.children;
        const isParentActive = location.pathname.startsWith(item.path) && (item.path !== "/admin" || location.pathname === "/admin");
        const isActive = location.pathname === item.path;
        const isExpanded = !!expanded[item.path];

        return (
          <div key={item.path} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: 8,
                background: isActive && !hasChildren ? Colors.primary : isParentActive && hasChildren ? Colors.surfaceContainerLow : "transparent",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  flex: 1,
                  color: isActive && !hasChildren ? "#fff" : isParentActive && hasChildren ? Colors.primary : Colors.onSurfaceVariant,
                  fontSize: 14,
                  fontWeight: isParentActive ? 600 : 500,
                  textDecoration: "none",
                  transition: "color 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Icon size={18} style={{ opacity: isParentActive ? 1 : 0.7 }} />
                <span style={{ flex: 1 }}>{item.label}</span>
              </Link>

              {hasChildren && (
                <button
                  onClick={(e) => toggleExpand(item.path, e)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                    color: isParentActive ? Colors.primary : Colors.outline,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.25s ease, color 0.25s ease",
                  }}
                >
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateRows: isExpanded ? "1fr" : "0fr",
                opacity: isExpanded ? 1 : 0,
                transition: "grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 18,
                  borderLeft: `1.5px solid ${Colors.surfaceContainer}`,
                  marginLeft: 20,
                  gap: "4px",
                  marginTop: "4px",
                  marginBottom: "4px",
                }}
              >
                {item.children?.map((subItem) => {
                  const SubIcon = subItem.icon;
                  const isSubActive = location.pathname === subItem.path;
                  return (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 12px",
                        borderRadius: 6,
                        background: isSubActive ? Colors.primary : "transparent",
                        color: isSubActive ? "#fff" : Colors.onSurfaceVariant,
                        fontSize: 13,
                        fontWeight: isSubActive ? 600 : 500,
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <SubIcon size={15} style={{ opacity: isSubActive ? 1 : 0.6 }} />
                      <span>{subItem.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}