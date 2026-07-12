import { Search, X } from "lucide-react";
import { Colors } from "../../../../lib/utils";

interface filters {
    search: string;
}

interface SearchInputProps {
    filters: filters;
    onFilterChange: (key: string, value: string) => void;
}

export default function SearchInput({ filters, onFilterChange }: SearchInputProps) {
    const selectStyle = {
        backgroundColor: Colors.surfaceContainerHigh,
        color: Colors.onSurface,
    };
    return (
        <div className="flex flex-col flex-1 gap-1 min-w-[180px]">
            <label
                className="text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: Colors.onSurfaceVariant }}
            >
                Search
            </label>

            <div className="relative">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: Colors.onSurfaceVariant }}
                />

                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => onFilterChange("search", e.target.value)}
                    placeholder="Search appointments..."
                    className="w-full rounded-lg py-2 pl-9 pr-9 text-sm border-none outline-none transition-all hover:bg-purple-50 focus:ring-2 focus:ring-purple-200"
                    style={selectStyle}
                />

                {filters.search && (
                    <button
                        onClick={() => onFilterChange("search", "")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-gray-200"
                    >
                        <X
                            size={14}
                            style={{ color: Colors.onSurfaceVariant }}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}