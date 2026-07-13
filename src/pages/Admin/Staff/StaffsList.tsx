import { useEffect, useState } from "react";
import { Star, IdCard, Circle } from "lucide-react";
import HeaderAndButtons from "../../../components/Admin/Staffs/StaffList/HeaderAndButtons";
import KpiCard from "../../../components/Admin/Staffs/StaffList/KpiCard";
import MainTable from "../../../components/Admin/Staffs/StaffList/MainTable";
import SidebarPerformanceInsights from "../../../components/Admin/Staffs/StaffList/SidebarPerformanceInsights";
import { Colors } from "../../../lib/utils";
import api from "../../../lib/api";

// ---- Mock data ----
const staffMembers = [
  {
    name: "Dr. Elena Vance",
    role: "Senior Aesthetician",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJmCYPA7N40-Yo4OIyhSg6JcVe7GSAHFvWdOkVCBhfODUP9JpZbVxDVm6yHCObDXIIvS3Zki4SKwY2SZ7rD2LQE050f2EVKwAxtTGfJu7rEQxXlibJ2sSVezEYJNvR9OyLUydwbtosBC0MpouSNpbsTIqdNpQSuP-z2ggAlp6oGkILVMXF5rhFP1oPIdrY3pF0DxdoxpV7pj_y7XtoNHRx9-6vUg8ROcGFj2Hv6aX2oBmY7Ev6reTwnl59c9laC1JFVwrdepcQVIne",
    status: "Active",
    rating: 4.9,
    reviews: 128,
  },
  {
    name: "Julian Thorne",
    role: "Lead Massage Therapist",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj-WO78l9SWuM1d71VIFXCXp69Bg8gBhHu59FHENctFGL9gYy4odqHGsyhS6KFESk9grGw8WGZrqGFCRctsZiuRA9tQ_Zy0_z5lE4CCV-dqFp0AE67UxFYwWHWKKOMPB6yFVRqxFGZXaPz4SmXUO94Ihndv_Qx-4Xr25lg_4wnAZboiuynFWUzOM0sI2w60XVfSlgtiRcLE0h-Q1BO0W9hj6OTa6IMzKbm0zmxG5XgHONu5_EDTYdL3sYIfWv3VBUypKeQj_YGD-fK",
    status: "On Break",
    rating: 4.7,
    reviews: 94,
  },
  {
    name: "Sophie Chen",
    role: "Dermatology Nurse",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm03WJ6W3K-A4b5Alj7pyT9F7rZuvtaQ4DTAic4pYjFn0mgJ8rvkoCkFiTzNEjcY-O-bl2FvQwpbc5_vuXct4J2dnLZt1ID9sdRVIXO_3IYrxzAWJT6bh1btzkahHBRO1P7oD39vvb757Ck3kDqrvqHcsS3BLngch9q7o6u3eH75oWHzsTC0QY_7BiJTeHl5SFRKWd3UG1OOZeZymkbY9tHGHaZ-zuBYqTgSHFiGoOWtBSYoaolCclWzQzocz7SjGq-bQL3ZIAIn_i",
    status: "Offline",
    rating: 5.0,
    reviews: 210,
  },
  {
    name: "Marcus Reed",
    role: "Medical Director",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCASSGbBaH1FDRwI2qdCQP-ep_t1em9z8FIc2SL41_k6hzXcYdlqmQtrJRud35M2tB98bb3OfoTF9CcEKxpFGOEnGpVq_qh7J4mEqca_DouAUxDvAc1-cJNKfsfDtbXvtu8qwSqsjmFZF_aLKDUxmTLeFWBPXYgyMraPm8CbQ4ljKdKJZqnBYiKPtNYHwy9drR_3hWymbgVZ1xegScuEAKuskCBXQSl9wNaOJHf1Ij_n17uayWJHzcpsfwZzCuk0k_U-_KDZQSwG1MJ",
    status: "Active",
    rating: 4.8,
    reviews: 345,
  },
];

const topPerformers = [
  {
    rank: 1,
    name: "Dr. Elena Vance",
    satisfaction: 98,
    revenue: "$12.4k",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYU-b52YwbHgsu-8Mf_6ruRrAOwKZfdu8fjN7b6E6sRAFTw66o3iPhJ18o6NyANS9A8DTU5jvESateOT7DJesXfzgvbPMiTtPJN5VMvd0HcjcC7rpgbFjziW9i3Yy4cygqHOqPxrHIwL_d_FTocAt6GA1Ky9gpGibvde1taSp590K2_0GGwikEsLKxsCXYdK54XlnXUGtwbLlkkkaKbw66KV7EZDwa8K04SS_QEJtLWE8NMZ-KMtVd33RWctMbz92joN8IzTYan83b",
    badgeColor: "#fbbf24",
  },
  {
    rank: 2,
    name: "Marcus Reed",
    satisfaction: 95,
    revenue: "$10.2k",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPeLfCJLOs78ub6eHUcXkHJIZgZNogETk24BXrStFMXKRgEU9NmtDjJmreVTWT2H8mOv4bGLpRtFH7Vh9nuzqZwFJsZ5hBxoxVD8VdlWCmdFo0uoo5cA--eFCZ7fYaMFfqYK6hQOxRPqrzFu9J8OXBjs_B9f2SNKawxdJeNL0NVQH29-P3JuJhCH8cFX87e5Yw8tteWOL4mSPIZwDqEZlkkt0LQnmYSqpV6C3PMnqUNfj610oWz0mczDWGIO3ejb6U0Bm3jywfAo3f",
    badgeColor: "#e2e8f0",
  },
  {
    rank: 3,
    name: "Sophie Chen",
    satisfaction: 94,
    revenue: "$8.9k",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHPVr9NrgqT6x0nk5c8Pa7qgXMegvd8N1MEdXut9tMGu98hGWlFK23Gmqz10xs0-Tf5xXc9AM6vUNg6Rd4B5SxLcmpPgBcm7xk1NNROsFeNnAtj5WPLU1Ps6x1gYaiwi8cC0jdaosqUMe5z1z6Cba4TEQXUtMsGF416ikjf5M3MmfRE_Z-nW3FgTyY2iPycXyvdy-aeLLxIMy2kCwF4jGv47evoIvVV0UmM5DEWwyg9fbgg_yQ_i2Elu51YEvUfsmu28Ipr0BUzYPr",
    badgeColor: "#fed7aa",
  },
];

const filters = ["All Staff", "Aestheticians", "Therapists", "Reception"];

export default function StaffsList() {
  const [activeFilter, setActiveFilter] = useState("All Staff");
  const [sortBy, setSortBy] = useState("Performance");

  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);

  const fetchStaffs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/staff");

      console.log(response.data);
      console.log(Array.isArray(response.data.data));

      setStaffs(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <div
      style={{
        padding: "28px 32px",
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      {/* Main Content */}
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <HeaderAndButtons />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard
            icon={<IdCard size={26} />}
            iconBg="rgba(70,72,212,0.1)"
            iconColor={Colors.primary}
            label="Total Staff"
            value="42"
            sublabel="+2 this month"
            sublabelColor="#059669"
          />
          <KpiCard
            icon={<Circle size={22} fill="currentColor" />}
            iconBg="rgba(16,185,129,0.1)"
            iconColor="#059669"
            label="Active Now"
            value="18"
            sublabel="4 on break"
          />
          <KpiCard
            icon={<Star size={24} fill="currentColor" />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="#d97706"
            label="Avg Rating"
            value="4.8"
            sublabel="Top 5% in region"
          />
        </div>

        {/* Directory + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Directory */}
          <MainTable
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            staffMembers={staffs}
          />

          {/* Sidebar: Performance Insights */}
          <aside className="flex-1 space-y-6">
            <SidebarPerformanceInsights topPerformers={topPerformers} />
          </aside>
        </div>
      </div>
    </div>
  );
}
