import { DollarSign, Plus } from "lucide-react";

interface TitleBlockProps {
  openCreateModal: () => void;
}

export default function TitleBlock({ openCreateModal }: TitleBlockProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <DollarSign className="text-indigo-600" size={24} />
          Services & Pricing Catalog
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure wellness packages, service durations, prices, and
          availability parameters.
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
  );
}
