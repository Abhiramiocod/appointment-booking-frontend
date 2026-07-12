import { useState, useEffect, useRef } from "react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { Colors } from "../../../../lib/utils";
import { Check, ChevronDown } from "lucide-react";

interface Service {
    id: number;
    name: string;
}

interface ServiceSelectProps {
    filters: {
        service_id: string;
    };
    onFilterChange: (key: string, value: string) => void;
    serviceList: Service[];
    searchServices: (query: string) => Promise<Service[]>;
}

export default function ServiceSelect({ filters, onFilterChange, serviceList, searchServices }: ServiceSelectProps) {
    const [serviceQuery, setServiceQuery] = useState("");
    const [isServiceLoading, setIsServiceLoading] = useState(false);
    const [serviceOptions, setServiceOptions] = useState<Service[]>([
        { id: 0, name: "All Services" },
        ...serviceList,
    ]);
    const serviceTimeoutRef = useRef<any>(null);

    // Sync service options when serviceList changes
    useEffect(() => {
        setServiceOptions([{ id: 0, name: "All Services" }, ...serviceList]);
    }, [serviceList]);

    // Debounced service search
    useEffect(() => {
        if (serviceTimeoutRef.current) clearTimeout(serviceTimeoutRef.current);
        serviceTimeoutRef.current = setTimeout(async () => {
            if (serviceQuery.trim() === "") {
                setServiceOptions([{ id: 0, name: "All Services" }, ...serviceList]);
            } else {
                setIsServiceLoading(true);
                const results = await searchServices(serviceQuery);
                setServiceOptions([{ id: 0, name: "All Services" }, ...results]);
                setIsServiceLoading(false);
            }
        }, 300);
        return () => {
            if (serviceTimeoutRef.current) clearTimeout(serviceTimeoutRef.current);
        };
    }, [serviceQuery, serviceList, searchServices]);

    const selectStyle = {
        backgroundColor: Colors.surfaceContainerHigh,
        color: Colors.onSurface,
    };

    const selectedService = serviceOptions.find(
        (s) => s.id.toString() === filters.service_id
    );

    return (
        <div className="flex flex-col gap-1 min-w-[140px]">
            <label
                className="text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: Colors.onSurfaceVariant }}
            >
                Service
            </label>

            <Combobox
                value={filters.service_id}
                onChange={(value) => onFilterChange("service_id", value)}
                immediate
            >
                <div className="relative w-32">
                    <ComboboxInput
                        className="flex w-full rounded-lg py-2 px-3 text-sm border-none outline-none transition-all focus:ring-2 focus:ring-purple-200"
                        style={selectStyle}
                        displayValue={() => selectedService?.name || "All Services"}
                        onChange={(event) => setServiceQuery(event.target.value)}
                        placeholder="Search services..."
                    />

                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {isServiceLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                        ) : (
                            <ChevronDown
                                size={16}
                                className="ml-2 flex-shrink-0"
                                style={{ color: Colors.onSurfaceVariant }}
                            />
                        )}
                    </ComboboxButton>

                    <ComboboxOptions
                        anchor="bottom start"
                        className="z-50 mt-1 w-[var(--input-width)] max-h-64 overflow-auto rounded-lg border bg-white py-1 text-sm shadow-xl focus:outline-none"
                        style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
                    >
                        {serviceOptions.length === 0 && serviceQuery ? (
                            <div className="px-3 py-2 text-xs text-gray-500">
                                No services found.
                            </div>
                        ) : (
                            serviceOptions.map((service) => (
                                <ComboboxOption
                                    key={service.id}
                                    value={service.id.toString()}
                                    className={({ active, selected }) =>
                                        `cursor-pointer px-3 py-2 text-sm ${active ? "bg-purple-50" : ""
                                        } ${selected
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
                                                {service.name}
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