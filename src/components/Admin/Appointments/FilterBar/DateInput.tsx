import { Calendar } from "lucide-react";
import { Colors } from "../../../../lib/utils";

interface filters {
    appointment_date: string;
}
interface DateInputProps {
    filters: filters;
    onFilterChange: (key: string, value: string) => void;
}

export default function DateInput({ filters, onFilterChange }: DateInputProps) {
    const selectStyle = {
        backgroundColor: Colors.surfaceContainerHigh,
        color: Colors.onSurface,
    };
    return (
        <div className="flex flex-col gap-1 min-w-[140px]">
            <label
                className="text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: Colors.onSurfaceVariant }}
            >
                Date
            </label>

            <div className="relative">
                <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: Colors.onSurfaceVariant }}
                />

                <input
                    type="date"
                    value={filters.appointment_date}
                    onChange={(e) =>
                        onFilterChange("appointment_date", e.target.value)
                    }
                    className="w-full rounded-lg py-2 pl-9 pr-3 text-sm border-none outline-none transition-all hover:bg-purple-50 focus:ring-2 focus:ring-purple-200"
                    style={selectStyle}
                />
            </div>
        </div>
    );
}