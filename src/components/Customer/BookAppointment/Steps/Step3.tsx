interface Step3Props {
  step: number;
  setStep: (step: number) => void;
}

export default function Step3({ step, setStep }: Step3Props) {
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => step > 3 && setStep(3)}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
          step > 3
            ? "bg-indigo-600 text-white"
            : step === 3
              ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
              : "bg-slate-200 text-slate-500"
        }`}
      >
        {step > 3 ? "✓" : "3"}
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${step >= 3 ? "text-indigo-600" : "text-slate-400"}`}
      >
        Schedule
      </span>
    </div>
  );
}
