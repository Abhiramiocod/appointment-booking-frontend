interface Step1Props {
  step: number;
  setStep: (step: number) => void;
}

export default function Step1({ step, setStep }: Step1Props) {
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => step > 1 && setStep(1)}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
          step > 1
            ? "bg-indigo-600 text-white"
            : step === 1
              ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
              : "bg-slate-200 text-slate-500"
        }`}
      >
        {step > 1 ? "✓" : "1"}
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${step >= 1 ? "text-indigo-600" : "text-slate-400"}`}
      >
        Service
      </span>
    </div>
  );
}
