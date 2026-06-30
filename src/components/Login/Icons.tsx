import type React from "react";
import {
  BarChart3,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Code2,
  CreditCard,
  Eye,
  EyeOff,
  Laptop,
  Mail,
  MonitorSmartphone,
  MoveRight,
  ShieldCheck,
  Share2,
  Smartphone,
  Sparkles,
  Tablet,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconProps {
  name: string;
  fill?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ICONS: Record<string, LucideIcon> = {
  api: Code2,
  arrow_forward: MoveRight,
  auto_awesome: Sparkles,
  bolt: Zap,
  check_circle: CheckCircle2,
  contact_support: CircleHelp,
  desktop_windows: Laptop,
  devices: MonitorSmartphone,
  event: Calendar,
  event_available: CalendarCheck,
  expand_more: ChevronDown,
  mail: Mail,
  monitoring: BarChart3,
  payments: CreditCard,
  phone_iphone: Smartphone,
  share: Share2,
  tablet_mac: Tablet,
  verified_user: ShieldCheck,
  visibility: Eye,
  visibility_off: EyeOff,
};

const sizeFromStyle = (style: React.CSSProperties) => {
  const size = style.fontSize;
  return typeof size === "number" ? size : undefined;
};

const Icon = ({ name, fill = 0, className = "", style = {} }: IconProps) => {
  const SvgIcon = ICONS[name] ?? CircleHelp;
  const size = sizeFromStyle(style) ?? 24;
  const { fontSize, ...iconStyle } = style;

  return (
    <SvgIcon
      aria-hidden="true"
      className={className}
      fill={fill ? "currentColor" : "none"}
      size={size}
      strokeWidth={2}
      style={{
        display: "inline-block",
        flexShrink: 0,
        verticalAlign: "middle",
        ...iconStyle,
      }}
    />
  );
};

export default Icon;
