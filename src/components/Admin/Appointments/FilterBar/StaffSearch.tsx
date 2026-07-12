import { useState, useEffect, useRef } from "react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { Colors } from "../../../../lib/utils";
import { Check, ChevronDown, Search, X } from "lucide-react";

interface Staff {
  id: number;
  name: string;
}

interface StaffSearchProps {
    filters: {
        staff_id: string;
    };
    onFilterChange: (key: string, value: string) => void;
    searchStaff: (query: string) => Promise<Staff[]>;
}

export default function StaffSearch({ filters, onFilterChange, searchStaff }: StaffSearchProps) {
    const [staffQuery, setStaffQuery] = useState("");
    const [staffOptions, setStaffOptions] = useState<Staff[]>([
      { id: 0, name: "All Staff" },
    ]);
    const [isStaffLoading, setIsStaffLoading] = useState(false);
    const staffTimeoutRef = useRef<any>(null);
    const [selectedStaffObject, setSelectedStaffObject] = useState<Staff | null>(null);

    // Selected items
    useEffect(() => {
      if (!filters.staff_id) {
        setSelectedStaffObject(null);
        return;
      }
      const found = staffOptions.find(
        (s) => s.id.toString() === filters.staff_id
      );
      if (found) {
        setSelectedStaffObject(found);
      }
    }, [filters.staff_id, staffOptions]);

    // If page loads with a staff_id, fetch/search to resolve the name
    useEffect(() => {
      if (filters.staff_id && !selectedStaffObject) {
        searchStaff("").then((results) => {
          const found = results.find((s) => s.id.toString() === filters.staff_id);
          if (found) setSelectedStaffObject(found);
        });
      }
    }, [filters.staff_id, searchStaff, selectedStaffObject]);

    // Debounced staff search
    useEffect(() => {
      if (staffTimeoutRef.current) clearTimeout(staffTimeoutRef.current);
      staffTimeoutRef.current = setTimeout(async () => {
        if (staffQuery.trim() === "") {
          setStaffOptions([{ id: 0, name: "All Staff" }]);
        } else {
          setIsStaffLoading(true);
          const results = await searchStaff(staffQuery);
          setStaffOptions([{ id: 0, name: "All Staff" }, ...results]);
          setIsStaffLoading(false);
        }
      }, 300);
      return () => {
        if (staffTimeoutRef.current) clearTimeout(staffTimeoutRef.current);
      };
    }, [staffQuery, searchStaff]);

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
            Staff
        </label>

        <Combobox
            value={filters.staff_id}
            onChange={(value) => onFilterChange("staff_id", value)}
            immediate
        >
            <div className="relative w-38">
                <ComboboxButton className="w-full text-left relative block">
                    <ComboboxInput
                        className="w-full rounded-lg py-2 px-3 pr-9 text-sm border-none outline-none transition-all hover:bg-purple-50"
                        style={selectStyle}
                        displayValue={() => selectedStaffObject?.name || "All Staff"}
                        readOnly
                    />

                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown
                            size={16}
                            style={{ color: Colors.onSurfaceVariant }}
                        />
                    </span>
                </ComboboxButton>

                <ComboboxOptions
                    anchor="bottom start"
                    className="z-50 mt-1 w-[var(--input-width)] max-h-64 overflow-auto rounded-lg border bg-white py-1 text-sm shadow-xl focus:outline-none"
                    style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
                >
                    <div
                        className="sticky top-0 z-10 border-b border-gray-100 bg-white p-2"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <Search
                                size={13}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-200 py-1.5 pl-8 pr-8 text-xs text-black focus:outline-none focus:ring-1 focus:ring-purple-400"
                                placeholder="Search staff..."
                                value={staffQuery}
                                onChange={(event) => setStaffQuery(event.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                            />

                            {staffQuery && (
                                <button
                                    onClick={() => setStaffQuery("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-100"
                                >
                                    <X size={12} className="text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>

                    {isStaffLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                        </div>
                    ) : staffOptions.length === 0 ? (
                        <div className="px-3 py-2 text-xs text-gray-500">
                            No staff found.
                        </div>
                    ) : (
                        staffOptions.map((staff) => (
                            <ComboboxOption
                                key={staff.id}
                                value={staff.id.toString()}
                                className={({ active, selected }) =>
                                    `cursor-pointer px-3 py-2 text-sm ${
                                        active ? "bg-purple-50" : ""
                                    } ${
                                        selected
                                            ? "font-semibold text-purple-700"
                                            : ""
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="truncate"
                                            style={{ color: Colors.onSurface }}
                                        >
                                            {staff.name}
                                        </span>

                                        {selected && (
                                            <Check
                                                size={14}
                                                className="ml-2 shrink-0"
                                                style={{ color: Colors.primary }}
                                            />
                                        )}
                                    </div>
                                )}
                            </ComboboxOption>
                        ))
                    )}
                </ComboboxOptions>
            </div>
        </Combobox>
    </div>
);
}