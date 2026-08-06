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
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">receipt_long</span>
        Booking Summary
      </h4>

      <div className="space-y-6">
        {/* Service block */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center text-slate-400 shrink-0">
            <span className="material-symbols-outlined text-xl">spa</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Service Selected
            </p>
            <p className="text-xs font-bold text-slate-800 truncate">
              {selectedService ? selectedService.name : "Not selected"}
            </p>
            <p className="text-[10px] text-slate-400">
              {selectedService
                ? `${selectedService.duration} Min • ₹${selectedService.price}`
                : "—"}
            </p>
          </div>
        </div>

        {/* Staff block */}
        <div className={`flex items-start gap-4 transition-opacity ${selectedStaff ? "" : "opacity-50"}`}>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center text-slate-400 shrink-0">
            <span className="material-symbols-outlined text-xl">person</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Assigned Specialist
            </p>
            <p className="text-xs font-bold text-slate-800 truncate">
              {selectedStaff ? selectedStaff.name : "Selection required"}
            </p>
          </div>
        </div>

        {/* Time block */}
        <div className={`flex items-start gap-4 transition-opacity ${selectedSlot ? "" : "opacity-50"}`}>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center text-slate-400 shrink-0">
            <span className="material-symbols-outlined text-xl">event</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Appointment Time
            </p>
            <p className="text-xs font-bold text-slate-800 truncate">
              {selectedSlot
                ? `${selectedDate} at ${selectedSlot}`
                : "Waiting for schedule"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-dashed border-slate-200">
        <div className="flex justify-between items-center mb-2 text-xs">
          <span className="text-slate-500">Service Fee</span>
          <span className="font-bold text-slate-800">
            {selectedService ? `₹${parseFloat(selectedService.price).toFixed(2)}` : "₹0.00"}
          </span>
        </div>
        <div className="flex justify-between items-center mb-6 text-xs">
          <span className="text-slate-500">Luxury Tax (8%)</span>
          <span className="font-bold text-slate-800">
            {selectedService ? `₹${(parseFloat(selectedService.price) * 0.08).toFixed(2)}` : "₹0.00"}
          </span>
        </div>
        <div className="flex justify-between items-end border-t border-slate-100 pt-4">
          <span className="text-sm font-bold text-slate-800">Total</span>
          <span className="text-2xl font-bold text-indigo-600 leading-none">
            {selectedService
              ? `₹${(parseFloat(selectedService.price) * 1.08).toFixed(2)}`
              : "₹0.00"}
          </span>
        </div>
      </div>

    </div>
  );
}
