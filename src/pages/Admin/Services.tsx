import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Search, Plus, Edit3, Trash2, Clock, DollarSign, Activity, Loader2, X } from "lucide-react";

interface Service {
  id: number;
  name: string;
  description?: string;
  duration: number;
  price: string;
  is_active: boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/services", { params: { search } });
      setServices(response.data?.data || response.data || []);
    } catch (err) {
      console.error("Failed to load services list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const openCreateModal = () => {
    setEditingService(null);
    setName("");
    setDescription("");
    setDuration("");
    setPrice("");
    setIsActive(true);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (srv: Service) => {
    setEditingService(srv);
    setName(srv.name);
    setDescription(srv.description || "");
    setDuration(String(srv.duration));
    setPrice(String(srv.price));
    setIsActive(srv.is_active);
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !duration || !price) {
      setError("Please fill out name, duration and price.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const payload = {
        name,
        description,
        duration: parseInt(duration),
        price: parseFloat(price),
        is_active: isActive,
      };

      if (editingService) {
        await api.put(`/admin/services/${editingService.id}`, payload);
      } else {
        await api.post("/admin/services", payload);
      }

      setModalOpen(false);
      fetchServices();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save service. Check validation rules.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await api.delete(`/admin/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Title block */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <DollarSign className="text-indigo-600" size={24} />
            Services & Pricing Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure wellness packages, service durations, prices, and availability parameters.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Plus size={14} />
          Create Service
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service name or description..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all"
          />
        </div>
      </div>

      {/* Services List Grid */}
      {loading ? (
        <div className="bg-white p-12 flex justify-center items-center rounded-2xl border border-slate-200 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
          <DollarSign className="mx-auto text-slate-300 mb-3" size={32} />
          <p className="text-slate-600 font-bold text-sm">No Services Configured</p>
          <p className="text-slate-400 text-xs mt-1">Create your first wellness service above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-indigo-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-base text-slate-800 leading-snug">{srv.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${
                      srv.is_active
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {srv.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">
                  {srv.description || "No description provided."}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-2">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-400" />
                      {srv.duration} min
                    </span>
                  </div>
                  <span className="text-indigo-600 font-extrabold text-base">${srv.price}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(srv)}
                    className="flex-1 py-2 px-3 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Edit3 size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id)}
                    className="py-2 px-3 border border-transparent hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                {editingService ? "Edit Service" : "Create New Service"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200/50 text-rose-700 text-xs rounded-lg">
                  ⚠️ {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Service Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Premium Beard Trim"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details about the service package..."
                  rows={3}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Duration (mins)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="30"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="45.00"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="is_active" className="text-xs font-semibold text-slate-700">
                  Service is active and bookable
                </label>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting && <Loader2 size={13} className="animate-spin" />}
                  {editingService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
