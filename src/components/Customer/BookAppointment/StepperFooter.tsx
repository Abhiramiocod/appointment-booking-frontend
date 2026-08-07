import { Loader2, MoveLeft, MoveRight } from "lucide-react";

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

interface StepperFooterProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedService: Service | null;
  selectedStaff: Staff | null;
  selectedSlot: string | null;
  handleBook: () => void;
  booking: boolean;
}

export default function StepperFooter({
  step,
  setStep,
  selectedService,
  selectedStaff,
  selectedSlot,
  handleBook,
  booking,
}: StepperFooterProps) {
  return (
    <footer className="flex justify-between items-center pt-8 border-t border-slate-100">
      <button
        disabled={step === 1}
        onClick={() => setStep((prev) => prev - 1)}
        className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all disabled:opacity-0"
      >
        <div className="flex gap-2 items-center">
          <MoveLeft size={14} className="text-slate-800" />
          Back
        </div>
      </button>

      {step < 4 ? (
        <button
          disabled={
            (step === 1 && !selectedService) ||
            (step === 2 && !selectedStaff) ||
            (step === 3 && !selectedSlot)
          }
          onClick={() => setStep((prev) => prev + 1)}
          className="px-6 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          <div className="flex gap-2 items-center">
            Continue
            <MoveRight size={14} />
          </div>
        </button>
      ) : (
        <button
          onClick={handleBook}
          disabled={booking}
          className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {booking && <Loader2 size={14} className="animate-spin" />}
          Confirm & Book Appointment
        </button>
      )}
    </footer>
  );
}