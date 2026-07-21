import { Star } from "lucide-react";

export default function StarRow({ count }: { count: number }) {
  return (
    <div className="flex text-yellow-500">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}
