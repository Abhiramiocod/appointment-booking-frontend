interface HeaderProps {
  step?: number;
}

export default function Header({ step: _step }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
          Book an Appointment
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl">
          Choose a service, select your preferred specialist, pick a convenient time, and confirm your booking.
        </p>
      </div>
    </div>
  );
}

