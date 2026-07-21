import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  quote: string;
  service?: string;
  date?: string;
}

interface ReviewProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewProps) {
  const hasReviews = reviews && reviews.length > 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            size={13}
            className={idx < rating ? "fill-amber-400" : "text-slate-200"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-800">Recent Reviews</h2>
        <Link
          to="/staff/reviews"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/50 p-6 shadow-sm">
        {!hasReviews ? (
          <div className="text-center py-6 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
              <Star size={18} className="fill-amber-500" />
            </div>
            <p className="text-xs font-semibold text-slate-700">No Reviews Yet</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Reviews from your clients will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4 divide-y divide-slate-100">
            {reviews.map((review, index) => {
              const initials = review.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              
              const detailText = [review.service, review.date]
                .filter(Boolean)
                .join(" • ");

              return (
                <div
                  key={`${review.name}-${index}`}
                  className={`flex flex-col gap-3 ${index > 0 ? "pt-4" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {initials}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 block leading-tight">
                          {review.name}
                        </span>
                        {detailText && (
                          <span className="text-[11px] text-slate-400 mt-0.5 block">
                            {detailText}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Stars */}
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-xs italic text-slate-500 leading-relaxed pl-12">
                    "{review.quote}"
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
