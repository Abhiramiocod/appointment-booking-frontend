import React, { useState } from "react";
import { Star, Loader2, X } from "lucide-react";
import api from "../../../lib/api";

interface ReviewModalProps {
  appointmentId: number;
  onClose: () => void;
  onSuccess: (updatedAppointment: any) => void;
}

export default function ReviewModal({ appointmentId, onClose, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/customer/appointments/${appointmentId}/review`, {
        rating,
        review: comment,
      });
      onSuccess(response.data.data);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(27, 27, 35, 0.25)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800">Leave a Review</h3>
          <p className="text-slate-400 text-xs mt-1">
            Share your feedback on the styling service and your specialist.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200/60 text-red-700 text-xs rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating Selection */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-slate-300 hover:text-yellow-400 transition-colors"
                >
                  <Star
                    size={28}
                    className={
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400 animate-scale-in"
                        : "text-slate-200"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment text block */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full bg-slate-50/50 rounded-2xl px-4 py-3 text-xs border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[110px]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || rating === 0}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
