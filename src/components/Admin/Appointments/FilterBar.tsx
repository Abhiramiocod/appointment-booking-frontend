import { Colors } from "../../../lib/utils";
import SelectStatus from "./FilterBar/SelectStatus";
import StaffSearch from "./FilterBar/StaffSearch";
import ServiceSelect from "./FilterBar/ServiceSelect";
import DateInput from "./FilterBar/DateInput";
import SearchInput from "./FilterBar/SearchInput";

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

export default function FilterBar({
  filters,
  onFilterChange,
  onReset,
  serviceList,
  searchStaff,
  searchServices,
}: FilterBarProps) {
  return (
    <div
      className="relative z-10 mb-6 flex flex-wrap items-end gap-x-5 gap-y-3 rounded-xl border p-4 shadow-md"
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(139, 92, 246, 0.15)",
      }}
    >
      {/* Status */}
      <SelectStatus
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {/* Staff */}
      <StaffSearch
        filters={filters}
        onFilterChange={onFilterChange}
        searchStaff={searchStaff}
      />

      {/* Service */}
      <ServiceSelect
        filters={filters}
        onFilterChange={onFilterChange}
        serviceList={serviceList}
        searchServices={searchServices}
      />

      {/* Date */}
      <DateInput
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {/* Search */}
      <div className="flex-1 min-w-[240px]">
        <SearchInput
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="ml-auto self-end flex h-[38px] items-center rounded-lg px-4 text-sm font-medium transition-all hover:bg-purple-50 hover:scale-[1.02] active:scale-95"
        style={{
          backgroundColor: Colors.surfaceContainerHighest,
          color: Colors.primary,
        }}
      >
        Reset
      </button>
    </div>
  );
}
