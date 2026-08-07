import { Sparkles, User, Calendar, Receipt } from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: number;
  description: string;
}

interface Staff {
  id: number;
  name: string;
  email: string;
  staff_profile?: {
    bio?: string;
    experience_years?: number;
  };
}

interface BookingSummaryProps {
  selectedService: Service | null;
  selectedStaff: Staff | null;
  selectedDate: string;
  selectedSlot: string | null;
}

export default function BookingSummary({
  selectedService,
  selectedStaff,
  selectedDate,
  selectedSlot,
}: BookingSummaryProps) {
  const servicePrice = selectedService ? parseFloat(selectedService.price) : 0;
  const tax = servicePrice * 0.08;
  const total = servicePrice + tax;

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm lg:sticky lg:top-6">
      <h4 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-5 flex items-center gap-2">
        <Receipt size={16} />
        Your Appointment
      </h4>

      <div className="space-y-4.5">
        {/* Service block */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
            <Sparkles size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
              Service
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
              {selectedService ? selectedService.name : "Select a service"}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {selectedService
                ? `${selectedService.duration} Min • $${selectedService.price}`
                : "—"}
            </p>
          </div>
        </div>

        {/* Staff block */}
        <div className={`flex items-start gap-3.5 transition-opacity ${selectedStaff ? "" : "opacity-50"}`}>
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
              Specialist
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
              {selectedStaff ? selectedStaff.name : "Pending selection"}
            </p>
          </div>
        </div>

        {/* Time block */}
        <div className={`flex items-start gap-3.5 transition-opacity ${selectedSlot ? "" : "opacity-50"}`}>
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
            <Calendar size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
              Date & Time
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
              {selectedSlot
                ? `${selectedDate} at ${selectedSlot}`
                : "Pending selection"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-dashed border-slate-200">
        <div className="flex justify-between items-center mb-2 text-xs">
          <span className="text-slate-500 font-semibold">Service Fee</span>
          <span className="font-bold text-slate-800">
            ${servicePrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4 text-xs">
          <span className="text-slate-500 font-semibold">Estimated Tax (8%)</span>
          <span className="font-bold text-slate-800">
            ${tax.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-end border-t border-slate-100 pt-4">
          <span className="text-sm font-extrabold text-slate-900">Total Price</span>
          <span className="text-2xl font-extrabold text-blue-600 leading-none">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

