interface HeaderProps {
  step: number;
}

export default function Header({ step }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
          Reserve Excellence
        </h1>
        <p className="text-slate-500 text-xs">
          {step === 1 && "Step 1 of 4: Select your premium wellness experience"}
          {step === 2 && "Step 2 of 4: Select your specialist"}
          {step === 3 && "Step 3 of 4: Select date and available time slot"}
          {step === 4 && "Step 4 of 4: Review and confirm your booking"}
        </p>
      </div>
    </div>
  );
}
