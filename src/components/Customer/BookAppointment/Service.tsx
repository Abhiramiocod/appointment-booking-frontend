import { Clock, Loader2, CheckCircle2, Sparkles } from "lucide-react";

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
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((srv) => {
            const isSelected = selectedService?.id === srv.id;

            return (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedService(srv);
                  setStep(2);
                }}
                className={`border rounded-2xl p-6 cursor-pointer transition-all duration-200 relative group flex flex-col justify-between ${
                  isSelected
                    ? "bg-blue-50/60 border-blue-600 shadow-md ring-1 ring-blue-600"
                    : "bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 text-blue-600 bg-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle2 size={22} className="fill-blue-600 text-white" />
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                    >
                      <Sparkles size={20} />
                    </div>
                    <span className="text-lg font-extrabold text-blue-600 bg-blue-50/90 px-3 py-1 rounded-xl border border-blue-100/80">
                      ${srv.price}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-5 line-clamp-2">
                    {srv.description || "Professional wellness session."}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold pt-3 border-t border-slate-100">
                  <Clock size={13} className="text-slate-400" />
                  <span>{srv.duration} Minutes</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}