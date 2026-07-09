import { useEffect, useState, useRef } from "react";
import { X, XCircle, CheckCircle2 } from "lucide-react";
import { Colors } from "../lib/utils";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      // Calculate how much time had elapsed before hover and subtract it
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    } else {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onClose();
      }, remainingTimeRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isHovered, onClose]);

  // Tick the progress bar
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setTimeLeft(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const currentRemaining = Math.max(0, remainingTimeRef.current - elapsed);
        return currentRemaining;
      });
    }, 30); // ~33fps is plenty smooth for the progress bar tick and has low CPU usage

    return () => clearInterval(interval);
  }, [isHovered]);

  const percentage = (timeLeft / duration) * 100;

  const isSuccess = type === "success";
  const themeColor = isSuccess ? "#22c55e" : Colors.error;
  const bgColor = isSuccess ? "rgba(220, 252, 231, 0.95)" : "rgba(252, 231, 231, 0.95)";
  const textColor = isSuccess ? "#15803d" : Colors.error;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-4 right-4 z-50 flex flex-col overflow-hidden rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] animate-fade-in"
      style={{
        backgroundColor: bgColor,
        borderColor: themeColor,
        minWidth: "320px",
        maxWidth: "450px",
      }}
    >
      {/* Toast Content */}
      <div className="flex items-center gap-3 px-5 py-4">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: themeColor }} />
        ) : (
          <XCircle className="w-5 h-5 flex-shrink-0" style={{ color: themeColor }} />
        )}
        
        <p className="font-medium text-sm flex-grow pr-2" style={{ color: textColor }}>
          {message}
        </p>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 active:bg-black/10 transition-colors duration-200"
          style={{ color: textColor }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-black/5">
        <div
          className="h-full transition-all ease-linear"
          style={{
            width: `${percentage}%`,
            backgroundColor: themeColor,
            transitionDuration: isHovered ? "0ms" : "30ms",
          }}
        />
      </div>
    </div>
  );
}

