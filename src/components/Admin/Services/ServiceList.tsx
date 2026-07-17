import { Loader2, DollarSign, Clock, Edit3, Trash2 } from "lucide-react";

interface Service {
  id: number;
  name: string;
  description?: string;
  duration: number;
  price: string;
  is_active: boolean;
}

interface ServiceListProps {
  loading: boolean;
  services: Service[];
  openEditModal: (srv: Service) => void;
  handleDelete: (id: number, srvName: string) => void;
}

export default function ServiceList({
  loading,
  services,
  openEditModal,
  handleDelete,
}: ServiceListProps) {
  if (loading) {
    return (
      <div className="bg-white p-12 flex justify-center items-center rounded-2xl border border-slate-200 shadow-sm">
        <Loader2 className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
        <DollarSign className="mx-auto text-slate-300 mb-3" size={32} />
        <p className="text-slate-600 font-bold text-sm">No Services Configured</p>
        <p className="text-slate-400 text-xs mt-1">Create your first wellness service above.</p>
      </div>
    );
  }

  return (
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
                onClick={() => handleDelete(srv.id, srv.name)}
                className="py-2 px-3 border border-transparent hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}