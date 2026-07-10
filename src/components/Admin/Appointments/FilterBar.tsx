import { useState, useEffect, useRef } from "react";
import { Calendar, Search, X, ChevronDown, Check } from "lucide-react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { Colors } from "../../../lib/utils";

interface Staff {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

interface FilterBarProps {
  filters: {
    status: string;
    staff_id: string;
    service_id: string;
    appointment_date: string;
    search: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
  serviceList: Service[];
  searchStaff: (query: string) => Promise<Staff[]>;
  searchServices: (query: string) => Promise<Service[]>;
}

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function FilterBar({
  filters,
  onFilterChange,
  onReset,
  serviceList,
  searchStaff,
  searchServices,
}: FilterBarProps) {
  // Staff combobox state
  const [staffQuery, setStaffQuery] = useState("");
  const [staffOptions, setStaffOptions] = useState<Staff[]>([
    { id: 0, name: "All Staff" },
  ]);
  const [isStaffLoading, setIsStaffLoading] = useState(false);
  const staffTimeoutRef = useRef<any>(null);

  // Service combobox state
  const [serviceQuery, setServiceQuery] = useState("");
  const [serviceOptions, setServiceOptions] = useState<Service[]>([
    { id: 0, name: "All Services" },
    ...serviceList,
  ]);
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const serviceTimeoutRef = useRef<any>(null);

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
  }, [filters.staff_id]);

  const selectedService = serviceOptions.find(
    (s) => s.id.toString() === filters.service_id
  );

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

  return (
    <div
      className="rounded-2xl p-6 mb-8 flex flex-wrap gap-4 items-end shadow-lg border relative z-10"
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(139, 92, 246, 0.2)",
      }}
    >
      {/* Status - Select */}
      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Status
        </label>
        <Combobox
          value={filters.status}
          onChange={(value) => onFilterChange("status", value)}
        >
          <div className="relative">
            <ComboboxInput
              className="w-full rounded-xl py-3 px-4 pr-10 text-sm border-none outline-none cursor-pointer transition-all hover:bg-purple-50"
              style={selectStyle}
              displayValue={(value: any) => {
                const option = statusOptions.find((opt) => opt.value === value);
                return option ? option.label : "All Statuses";
              }}
              readOnly
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown
                size={18}
                style={{ color: Colors.onSurfaceVariant }}
              />
            </ComboboxButton>
            <ComboboxOptions className="absolute z-[99999] mt-2 w-full max-h-60 overflow-auto rounded-xl border bg-white py-1 text-base shadow-2xl focus:outline-none sm:text-sm" style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}>
              {statusOptions.map((option) => (
                <ComboboxOption
                  key={option.value}
                  value={option.value}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-2.5 px-4 ${
                      active ? "bg-purple-50" : ""
                    } ${selected ? "font-bold text-purple-700" : ""}`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <span style={{ color: Colors.onSurface }}>
                        {option.label}
                      </span>
                      {selected && (
                        <Check size={16} style={{ color: Colors.primary }} />
                      )}
                    </div>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </div>
        </Combobox>
      </div>

      {/* Staff - Searchable Combobox */}
      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Staff
        </label>
        <Combobox
          value={filters.staff_id}
          onChange={(value) => onFilterChange("staff_id", value)}
        >
          <div className="relative">
            <ComboboxButton className="w-full text-left relative block">
              <ComboboxInput
                className="w-full rounded-xl py-3 px-4 pr-10 text-sm border-none outline-none cursor-pointer transition-all hover:bg-purple-50"
                style={selectStyle}
                displayValue={() => selectedStaffObject?.name || "All Staff"}
                readOnly
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown
                  size={18}
                  style={{ color: Colors.onSurfaceVariant }}
                />
              </span>
            </ComboboxButton>
            <ComboboxOptions className="absolute z-[99999] mt-2 w-full max-h-60 overflow-auto rounded-xl border bg-white py-1 text-base shadow-2xl focus:outline-none sm:text-sm" style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}>
              <div className="p-2 sticky top-0 bg-white border-b border-gray-100 z-10" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="w-full rounded-lg pl-8 pr-8 py-1.5 text-xs border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-400 text-black"
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
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full"
                    >
                      <X size={12} className="text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
              {isStaffLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
                </div>
              ) : staffOptions.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-500 text-xs">
                  No staff found.
                </div>
              ) : (
                staffOptions.map((staff) => (
                  <ComboboxOption
                    key={staff.id}
                    value={staff.id.toString()}
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none py-2.5 px-4 ${
                        active ? "bg-purple-50" : ""
                      } ${selected ? "font-bold text-purple-700" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: Colors.onSurface }}>
                          {staff.name}
                        </span>
                        {selected && (
                          <Check size={14} style={{ color: Colors.primary }} />
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

      {/* Service - Searchable Combobox */}
      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Service
        </label>
        <Combobox
          value={filters.service_id}
          onChange={(value) => onFilterChange("service_id", value)}
        >
          <div className="relative">
            <ComboboxInput
              className="w-full rounded-xl py-3 px-4 pr-10 text-sm border-none outline-none transition-all focus:ring-2 focus:ring-purple-200"
              style={selectStyle}
              displayValue={() => selectedService?.name || "All Services"}
              onChange={(event) => setServiceQuery(event.target.value)}
              placeholder="Search services..."
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isServiceLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
              ) : (
                <ChevronDown
                  size={18}
                  style={{ color: Colors.onSurfaceVariant }}
                />
              )}
            </ComboboxButton>
            <ComboboxOptions className="absolute z-[99999] mt-2 w-full max-h-60 overflow-auto rounded-xl border bg-white py-1 text-base shadow-2xl focus:outline-none sm:text-sm" style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}>
              {serviceOptions.length === 0 && serviceQuery ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-500">
                  No services found.
                </div>
              ) : (
                serviceOptions.map((service) => (
                  <ComboboxOption
                    key={service.id}
                    value={service.id.toString()}
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none py-2.5 px-4 ${
                        active ? "bg-purple-50" : ""
                      } ${selected ? "font-bold text-purple-700" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span style={{ color: Colors.onSurface }}>
                          {service.name}
                        </span>
                        {selected && (
                          <Check size={16} style={{ color: Colors.primary }} />
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

      {/* Date - Date Input */}
      <div className="flex flex-col gap-2 min-w-[160px]">
        <label
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Date
        </label>
        <div className="relative">
          <Calendar
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: Colors.onSurfaceVariant }}
          />
          <input
            type="date"
            value={filters.appointment_date}
            onChange={(e) => onFilterChange("appointment_date", e.target.value)}
            className="w-full rounded-xl py-3 pl-10 pr-4 text-sm border-none outline-none transition-all hover:bg-purple-50"
            style={selectStyle}
          />
        </div>
      </div>

      {/* Search - Input */}
      <div className="flex flex-col gap-2 min-w-[160px] flex-1">
        <label
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: Colors.onSurfaceVariant }}
        >
          Search
        </label>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: Colors.onSurfaceVariant }}
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Search appointments by customer, notes..."
            className="w-full rounded-xl py-3 pl-10 pr-10 text-sm border-none outline-none transition-all focus:ring-2 focus:ring-purple-200"
            style={selectStyle}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-all"
            >
              <X size={14} style={{ color: Colors.onSurfaceVariant }} />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="px-6 py-3 rounded-xl font-bold transition-all ml-auto hover:bg-purple-50 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: Colors.surfaceContainerHighest,
          color: Colors.primary,
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}
