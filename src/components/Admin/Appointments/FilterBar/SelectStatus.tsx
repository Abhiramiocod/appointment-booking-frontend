import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { Colors } from "../../../../lib/utils";
import { Check, ChevronDown } from "lucide-react";

interface SelectStatusProps {
    filters: {
        status: string;
    };
    onFilterChange: (key: string, value: string) => void;
}

const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
];

export default function SelectStatus({ filters, onFilterChange }: SelectStatusProps) {
    const selectStyle = {
        backgroundColor: Colors.surfaceContainerHigh,
        color: Colors.onSurface,
    };

    const selectedLabel =
        statusOptions.find((opt) => opt.value === filters.status)?.label ?? "All Statuses";

    return (
        <div className="flex flex-col gap-1 min-w-[140px]">
            <label
                className="text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: Colors.onSurfaceVariant }}
            >
                Status
            </label>

            <Listbox
                value={filters.status}
                onChange={(value) => onFilterChange("status", value)}
            >
                <div className="relative w-full">
                    <ListboxButton
                        className="flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-purple-50 focus:outline-none"
                        style={selectStyle}
                    >
                        <span
                            className="flex-1 truncate text-left"
                            style={{ color: Colors.onSurface }}
                        >
                            {selectedLabel}
                        </span>

                        <ChevronDown
                            size={16}
                            className="ml-2 flex-shrink-0"
                            style={{ color: Colors.onSurfaceVariant }}
                        />
                    </ListboxButton>

                    <ListboxOptions
                        anchor="bottom start"
                        className="z-50 mt-1 w-[var(--button-width)] overflow-hidden rounded-lg border bg-white py-1 shadow-xl focus:outline-none"
                        style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
                    >
                        {statusOptions.map((option) => (
                            <ListboxOption
                                key={option.value}
                                value={option.value}
                                className={({ focus, selected }) =>
                                    `cursor-pointer px-3 py-2 text-sm ${focus ? "bg-purple-50" : ""
                                    } ${selected ? "font-semibold text-purple-700" : ""
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <div className="flex items-center justify-between">
                                        <span style={{ color: Colors.onSurface }}>
                                            {option.label}
                                        </span>

                                        {selected && (
                                            <Check
                                                size={14}
                                                className="ml-2 flex-shrink-0"
                                                style={{ color: Colors.primary }}
                                            />
                                        )}
                                    </div>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    );
}