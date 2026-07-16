interface Step4Props {
  step: number;
}

export default function Step4({ step }: Step4Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
          step === 4
            ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
            : "bg-slate-200 text-slate-500"
        }`}
      >
        4
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${step === 4 ? "text-indigo-600" : "text-slate-400"}`}
      >
        Review
      </span>
    </div>
  );
}
