export default function Greeting() {
  return (
    <section className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
      <div>
        <h2 className="text-3xl font-bold">Good Morning, John 👋</h2>
        <p className="text-slate-500 mt-1">
          Your next appointment with{" "}
          <span className="font-semibold text-indigo-600">Sarah Jenkins</span>{" "}
          is in 2 hours.
        </p>
      </div>
      <div className="sm:text-right">
        <p className="text-xs font-semibold tracking-wide text-slate-400">
          TODAY
        </p>
        <p className="text-lg font-semibold">Thursday, Oct 24, 2023</p>
      </div>
    </section>
  );
}
