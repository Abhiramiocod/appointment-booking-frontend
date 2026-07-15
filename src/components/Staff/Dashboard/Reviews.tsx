import { MessageSquareText } from "lucide-react";
import StarRow from "./StarRow";

interface Review {
  name: string;
  rating: number;
  quote: string;
}

interface ReviewProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-800">Recent Reviews</h2>
        <MessageSquareText size={18} className="text-indigo-600" />
      </div>
      <div className="space-y-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="bg-white p-4 rounded-xl border border-slate-200 border-l-4 border-l-indigo-600 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-slate-800">{review.name}</span>
              <StarRow count={review.rating} />
            </div>
            <p className="text-xs italic text-slate-500 leading-relaxed">
              "{review.quote}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
