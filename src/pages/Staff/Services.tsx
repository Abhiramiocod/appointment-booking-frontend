import { useState, useEffect } from "react";
import { Scissors, Search, Clock, Loader2, AlertCircle, Ban } from "lucide-react";
import api from "../../lib/api";
import Toast from "../../components/Toast";

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  duration: number;
  price: string;
  is_active: boolean;
}

export default function Services() {
  const [assignedServices, setAssignedServices] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"assigned" | "all">("assigned");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch assigned services
      const resAssigned = await api.get("/staff/services");
      const assignedData = resAssigned.data?.data || resAssigned.data || [];
      setAssignedServices(assignedData);

      // Fetch all system services (using customer endpoint since it returns all active services)
      const resAll = await api.get("/customer/services");
      const allData = resAll.data?.data || resAll.data || [];
      setAllServices(allData);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isAssigned = (serviceId: number) => {
    return assignedServices.some((s) => s.id === serviceId);
  };

  const handleToggleAvailability = async (service: Service) => {
    setUpdatingId(service.id);
    setError(null);
    setSuccess(null);

    const currentlyAssigned = isAssigned(service.id);
    let newAssignedIds: number[];

    if (currentlyAssigned) {
      newAssignedIds = assignedServices
        .filter((s) => s.id !== service.id)
        .map((s) => s.id);
    } else {
      newAssignedIds = [...assignedServices.map((s) => s.id), service.id];
    }

    try {
      await api.put("/staff/services", {
        service_ids: newAssignedIds,
      });

      // Update local state
      if (currentlyAssigned) {
        setAssignedServices((prev) => prev.filter((s) => s.id !== service.id));
        setSuccess(`You are no longer offering "${service.name}".`);
      } else {
        setAssignedServices((prev) => [...prev, service]);
        setSuccess(`You are now offering "${service.name}".`);
      }
      
      setTimeout(() => setSuccess(null), 3500);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update service availability.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setUpdatingId(null);
    }
  };

  const formatPrice = (priceStr: string) => {
    const num = parseFloat(priceStr);
    return isNaN(num) ? "$0.00" : new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  // Filter services based on tab and search query
  const displayedServices = (activeTab === "assigned" ? assignedServices : allServices).filter(
    (service) => service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%", minHeight: "100vh", background: "#fcf8ff" }}>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Scissors size={18} />
              </div>
              My Services
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              View and manage the services that customers can book with you.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("assigned")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "assigned"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              My Active Services ({assignedServices.length})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Browse All ({allServices.length})
            </button>
          </div>
        </div>
      </section>

      {/* Control Bar: Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search services by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
          />
        </div>
        <p className="text-xs text-slate-400">
          Showing {displayedServices.length} service{displayedServices.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Notification Toast */}
      {success && (
        <Toast
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200/60 text-red-700 text-sm rounded-xl flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Services Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      ) : displayedServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-4">
            <Ban size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Services Found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm text-center">
            {searchQuery
              ? "We couldn't find any services matching your search criteria."
              : activeTab === "assigned"
              ? "You haven't assigned yourself to any services yet. Switch to 'Browse All' to see available services."
              : "No services are currently configured in the system."}
          </p>
          {activeTab === "assigned" && allServices.length > 0 && !searchQuery && (
            <button
              onClick={() => setActiveTab("all")}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              Browse System Services
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => {
            const assigned = isAssigned(service.id);
            const isUpdating = updatingId === service.id;
            
            return (
              <div
                key={service.id}
                className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 ${
                  assigned
                    ? "border-indigo-100 ring-2 ring-indigo-500/5"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Service Header Info */}
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="font-bold text-slate-800 text-base leading-snug tracking-tight">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Active/Inactive Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          service.is_active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        {service.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-xs line-clamp-3 mb-5 leading-relaxed min-h-[48px]">
                    {service.description || "No description provided for this service."}
                  </p>
                </div>

                {/* Footer specs & Actions */}
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-xs font-medium">{service.duration} mins</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-0.5 text-indigo-600 font-bold text-base">
                      <span>{formatPrice(service.price)}</span>
                    </div>
                  </div>

                  {/* Availability Toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-xs font-semibold text-slate-500">
                      My Availability
                    </span>
                    <button
                      type="button"
                      disabled={isUpdating || !service.is_active}
                      onClick={() => handleToggleAvailability(service)}
                      className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                        assigned ? "bg-indigo-600" : "bg-slate-200"
                      }`}
                    >
                      <span className="sr-only">Toggle Availability</span>
                      <span
                        className={`pointer-events-none relative inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          assigned ? "translate-x-5.5" : "translate-x-0"
                        } flex items-center justify-center`}
                      >
                        {isUpdating && (
                          <Loader2 size={10} className="animate-spin text-indigo-600" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
