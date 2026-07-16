import { Clock, Loader2 } from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: number;
  description: string;
}

interface ServiceProps {
  loading: boolean;
  services: Service[];
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  setStep: (step: number) => void;
}

export default function Service({
  loading,
  services,
  selectedService,
  setSelectedService,
  setStep,
}: ServiceProps) {
  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => {
                setSelectedService(srv);
                setStep(2);
              }}
              className={`bg-white border rounded-3xl p-6 hover:shadow-lg hover:ring-2 hover:ring-indigo-600/20 cursor-pointer transition-all ${
                selectedService?.id === srv.id
                  ? "ring-2 ring-indigo-600 border-indigo-600"
                  : "border-slate-200/80"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined text-3xl">spa</span>
                </div>
                <span className="text-xl font-bold text-indigo-600">${srv.price}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{srv.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                {srv.description || "Premium wellness package."}
              </p>
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <Clock size={12} />
                <span>{srv.duration} Min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}