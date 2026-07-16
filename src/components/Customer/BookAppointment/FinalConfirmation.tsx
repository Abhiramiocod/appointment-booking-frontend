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

interface FinalConfirmationProps {
  selectedService: Service;
  selectedStaff: Staff;
  selectedDate: string;
  selectedSlot: string;
  notes: string;
  setNotes: (notes: string) => void;
}

export default function FinalConfirmation({
  selectedService,
  selectedStaff,
  selectedDate,
  selectedSlot,
  notes,
  setNotes,
}: FinalConfirmationProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-lg">Final Summary</h3>
        <span className="px-4 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Slot Reserved
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-slate-100 py-8 text-xs">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Service
          </label>
          <p className="font-bold text-slate-800 text-sm mb-1">{selectedService.name}</p>
          <p className="text-slate-500">
            {selectedService.duration} Min • ${selectedService.price}
          </p>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Specialist
          </label>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600">
              {selectedStaff.name.charAt(0)}
            </div>
            <p className="font-bold text-slate-800">{selectedStaff.name}</p>
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Date & Time
          </label>
          <p className="font-bold text-slate-800">
            {selectedDate} at {selectedSlot}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Booking Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests or details..."
          className="w-full bg-slate-50/50 rounded-2xl px-4 py-3 text-xs border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[90px]"
        />
      </div>
    </div>
  );
}
