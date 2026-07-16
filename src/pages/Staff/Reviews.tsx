import { useEffect, useState } from "react";
import { Star, MessageSquare, Loader2, Calendar, User, Award } from "lucide-react";
import api from "../../lib/api";

interface Review {
  id: number;
  rating: number;
  review: string | null;
  created_at: string;
  customer?: {
    id: number;
    name: string;
  };
  appointment?: {
    id: number;
    appointment_date: string;
    service?: {
      id: number;
      name: string;
    };
  };
}

interface Stats {
  average_rating: number;
  total_reviews: number;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<Stats>({ average_rating: 0, total_reviews: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/staff/reviews");
      setReviews(response.data?.reviews?.data || response.data?.reviews || []);
      setStats(response.data?.stats || { average_rating: 0, total_reviews: 0 });
    } catch (err: any) {
      console.error(err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-8 flex-1 w-full space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <MessageSquare size={18} />
          </div>
          Client Reviews
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Read feedback and ratings submitted by your clients.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" size={28} />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200/60 text-red-700 text-xs rounded-2xl">
          ⚠️ {error}
        </div>
      ) : (
        <>
          {/* Summary Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
            {/* Avg Rating Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <Star size={26} className="fill-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
                <h3 className="text-3xl font-extrabold text-slate-800 leading-none mt-1">
                  {stats.average_rating.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                </h3>
              </div>
            </div>

            {/* Total Reviews Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Award size={26} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Reviews</span>
                <h3 className="text-3xl font-extrabold text-slate-800 leading-none mt-1">
                  {stats.total_reviews}
                </h3>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-bold text-slate-800 text-base">Reviews Feed</h3>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      {/* Customer Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border flex items-center justify-center font-bold text-slate-600 text-sm">
                          {rev.customer?.name.charAt(0) || "C"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm leading-snug">
                            {rev.customer?.name || "Anonymous Client"}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                            <Calendar size={10} />
                            {formatDate(rev.appointment?.appointment_date)}
                          </p>
                        </div>
                      </div>

                      {/* Stars Display */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>Service: {rev.appointment?.service?.name || "Styling Session"}</span>
                    </div>

                    {/* Review text comment */}
                    {rev.review && (
                      <p className="text-slate-600 text-xs leading-relaxed italic bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                        "{rev.review}"
                      </p>
                    )}

                    {/* Review submission Date */}
                    <div className="text-[9px] text-slate-400 text-right font-medium">
                      Reviewed on {formatDate(rev.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center shadow-sm">
                <p className="text-slate-400 italic text-sm">No client reviews submitted yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
