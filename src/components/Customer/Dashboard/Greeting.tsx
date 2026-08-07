import { useEffect, useState } from "react";
import { Sparkles, Calendar } from "lucide-react";

interface GreetingProps {
  userName?: string;
  nextAppointment?: {
    staffName?: string;
    serviceName?: string;
    date?: string;
    startTime?: string;
  } | null;
}

export default function Greeting({ userName, nextAppointment }: GreetingProps) {
  const [greetingText, setGreetingText] = useState("Good Morning");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Determine time of day greeting
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreetingText("Good Morning");
    } else if (hour < 17) {
      setGreetingText("Good Afternoon");
    } else {
      setGreetingText("Good Evening");
    }

    // Format live today's date (e.g. Thursday, Oct 24, 2024)
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    setFormattedDate(new Date().toLocaleDateString("en-US", options));
  }, []);

  // Resolve user name from props or localStorage fallback
  const resolvedName = (() => {
    if (userName) return userName;
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const u = JSON.parse(userStr);
        return u.name || "Customer";
      }
    } catch (e) {
      // fallback
    }
    return "Customer";
  })();

  return (
    <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-sm p-6 sm:p-7 rounded-2xl transition-all">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {greetingText}, {resolvedName}
          </h2>
          <span className="text-2xl animate-bounce">👋</span>
        </div>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed flex items-center gap-1.5 flex-wrap">
          {nextAppointment?.staffName ? (
            <>
              <Sparkles size={14} className="text-blue-600 shrink-0" />
              <span>Next session with</span>
              <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                {nextAppointment.staffName}
              </span>
              {nextAppointment.serviceName ? <span className="text-slate-500 font-medium">({nextAppointment.serviceName})</span> : null}
              <span>is set for</span>
              <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {nextAppointment.date} at {nextAppointment.startTime?.substring(0, 5)}
              </span>
            </>
          ) : (
            <span className="text-slate-500">You currently have no upcoming appointments scheduled.</span>
          )}
        </p>
      </div>
      <div className="sm:text-right shrink-0 bg-slate-50 border border-slate-200/70 px-4 py-2.5 rounded-xl self-start sm:self-auto">
        <div className="flex items-center gap-1.5 sm:justify-end text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          <Calendar size={12} className="text-blue-600" />
          <span>TODAY</span>
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">{formattedDate}</p>
      </div>
    </section>
  );
}

