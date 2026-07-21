import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { X, ChevronDown } from "lucide-react";
import api from "../../../lib/api";
import { Colors } from "../../../lib/utils";
import Toast from "../../Toast";

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Staff {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  price?: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
}

export default function CreateAppointmentModal({
  isOpen,
  onClose,
}: CreateAppointmentModalProps) {
  const [customerId, setCustomerId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("confirmed");
  const [notes, setNotes] = useState("");

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Customer search states
  const [searchQuery, setSearchQuery] = useState("");
  const [customerResults, setCustomerResults] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSearchingCustomer, setIsSearchingCustomer] = useState(false);
  const [, setShowCustomerDropdown] = useState(false);

  // Staff combobox states
  const [staffSearchQuery, setStaffSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [, setShowStaffDropdown] = useState(false);

  // Service combobox states
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [, setShowServiceDropdown] = useState(false);

  // Status combobox states
  const [statusSearchQuery, setStatusSearchQuery] = useState("Confirmed");
  const [, setShowStatusDropdown] = useState(false);

  // Fetch staff and services on open
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          // Fetch staff
          const staffResponse = await api.get("/admin/staff/search");
          setStaffList(staffResponse.data.data ?? staffResponse.data ?? []);
        } catch (err) {
          console.error("Failed to fetch staff, trying fallback...", err);
          try {
            const staffFallback = await api.get("/admin/staff");
            setStaffList(staffFallback.data.data ?? staffFallback.data ?? []);
          } catch (e) {
            console.error("Fallback staff fetch failed", e);
          }
        }

        try {
          // Fetch services
          const servicesResponse = await api.get("/admin/services");
          setServiceList(servicesResponse.data.data ?? servicesResponse.data ?? []);
        } catch (err) {
          console.error("Failed to fetch services", err);
        }
      };

      fetchData();

      // Reset form states
      setCustomerId("");
      setSearchQuery("");
      setCustomerResults([]);
      setSelectedCustomer(null);
      setShowCustomerDropdown(false);

      setStaffId("");
      setStaffSearchQuery("");
      setSelectedStaff(null);
      setShowStaffDropdown(false);

      setServiceId("");
      setServiceSearchQuery("");
      setSelectedService(null);
      setShowServiceDropdown(false);

      setAppointmentDate("");
      setStartTime("");
      setEndTime("");
      
      setStatus("confirmed");
      setStatusSearchQuery("Confirmed");
      setShowStatusDropdown(false);

      setNotes("");
    }
  }, [isOpen]);

  // Search customers with debounce
  useEffect(() => {
    if (!isOpen) return;
    if (selectedCustomer && searchQuery === `${selectedCustomer.name} (${selectedCustomer.email})`) {
      return;
    }
    if (!searchQuery.trim()) {
      setCustomerResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearchingCustomer(true);
      try {
        const response = await api.get("/admin/customers", {
          params: { search: searchQuery },
        });
        const data = response.data.data ?? response.data ?? [];
        setCustomerResults(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (err) {
        console.error("Failed to search customers:", err);
      } finally {
        setIsSearchingCustomer(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, isOpen, selectedCustomer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId || !staffId || !serviceId || !appointmentDate || !startTime || !endTime) {
      setToast({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        customer_id: Number(customerId),
        staff_id: Number(staffId),
        service_id: Number(serviceId),
        appointment_date: appointmentDate,
        start_time: startTime.includes(":") && startTime.split(":").length === 2 ? `${startTime}:00` : startTime,
        end_time: endTime.includes(":") && endTime.split(":").length === 2 ? `${endTime}:00` : endTime,
        status,
        notes: notes || null,
      };

      await api.post("/admin/appointments", payload);

      setToast({
        type: "success",
        message: "Appointment created successfully!",
      });

      // Dispatch event to reload appointment tables if present
      window.dispatchEvent(new Event("appointment-created"));

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setToast({
        type: "error",
        message: err.response?.data?.message ?? "Failed to create appointment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Local filtering for Staff, Service, and Status
  const filteredStaffList = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(staffSearchQuery.toLowerCase())
  );

  const filteredServiceList = serviceList.filter((service) =>
    service.name.toLowerCase().includes(serviceSearchQuery.toLowerCase())
  );

  const statuses = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];
  
  const filteredStatusList = statuses.filter((st) =>
    st.label.toLowerCase().includes(statusSearchQuery.toLowerCase())
  );

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-[9999]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex w-screen overflow-y-auto items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl duration-300 ease-out data-closed:opacity-0 data-closed:scale-95"
          >
            <div className="flex items-center justify-between mb-6">
              <DialogTitle
                as="h3"
                className="text-2xl font-bold"
                style={{ color: Colors.onSurface }}
              >
                New Appointment
              </DialogTitle>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ color: Colors.onSurfaceVariant }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer ID */}
              <div className="relative">
                <label
                  style={{ color: Colors.onSurfaceVariant }}
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                >
                  Customer *
                </label>
                <Combobox
                  value={customerId}
                  onChange={(val) => {
                    const found = customerResults.find(c => c.id.toString() === val);
                    if (found) {
                      setSelectedCustomer(found);
                      setCustomerId(found.id.toString());
                      setSearchQuery(`${found.name} (${found.email})`);
                    }
                  }}
                >
                  <div className="relative">
                    <ComboboxInput
                      className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none pr-20"
                      style={{ color: Colors.onSurface }}
                      displayValue={() => selectedCustomer ? `${selectedCustomer.name} (${selectedCustomer.email})` : searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (selectedCustomer && e.target.value !== `${selectedCustomer.name} (${selectedCustomer.email})`) {
                          setSelectedCustomer(null);
                          setCustomerId("");
                        }
                      }}
                      placeholder="Search by customer name or email..."
                      autoComplete="off"
                      required={!customerId}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {isSearchingCustomer ? (
                        <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
                      ) : (
                        <ChevronDown size={18} style={{ color: Colors.onSurfaceVariant }} />
                      )}
                    </ComboboxButton>
                    {selectedCustomer && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCustomer(null);
                          setCustomerId("");
                          setSearchQuery("");
                          setCustomerResults([]);
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded hover:bg-gray-200"
                        style={{ color: Colors.primary }}
                      >
                        Clear
                      </button>
                    )}

                    <ComboboxOptions className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-xl bg-white border border-gray-100 shadow-lg z-[99999] py-1">
                      {isSearchingCustomer ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                      ) : customerResults.length > 0 ? (
                        customerResults.map((customer) => (
                          <ComboboxOption
                            key={customer.id}
                            value={customer.id.toString()}
                            className={({ active, selected }) =>
                              `relative cursor-pointer select-none py-2.5 px-4 ${
                                active ? "bg-purple-50" : ""
                              } ${selected ? "font-bold text-purple-700" : ""}`
                            }
                          >
                            <div className="flex flex-col text-left">
                              <span className="font-semibold text-sm" style={{ color: Colors.onSurface }}>
                                {customer.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {customer.email} (ID: {customer.id})
                              </span>
                            </div>
                          </ComboboxOption>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">No customers found</div>
                      )}
                    </ComboboxOptions>
                  </div>
                </Combobox>
              </div>

              {/* Staff and Service row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Staff Select */}
                <div className="relative">
                  <label
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Staff *
                  </label>
                  <Combobox
                    value={staffId}
                    onChange={(val) => {
                      const found = staffList.find(s => s.id.toString() === val);
                      if (found) {
                        setSelectedStaff(found);
                        setStaffId(found.id.toString());
                        setStaffSearchQuery(found.name);
                      }
                    }}
                  >
                    <div className="relative">
                      <ComboboxInput
                        className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none pr-16"
                        style={{ color: Colors.onSurface }}
                        displayValue={() => selectedStaff ? selectedStaff.name : staffSearchQuery}
                        onChange={(e) => {
                          setStaffSearchQuery(e.target.value);
                          if (selectedStaff && e.target.value !== selectedStaff.name) {
                            setSelectedStaff(null);
                            setStaffId("");
                          }
                        }}
                        placeholder="Search Staff..."
                        autoComplete="off"
                        required={!staffId}
                      />
                      <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDown size={18} style={{ color: Colors.onSurfaceVariant }} />
                      </ComboboxButton>
                      {selectedStaff && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStaff(null);
                            setStaffId("");
                            setStaffSearchQuery("");
                          }}
                          className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded hover:bg-gray-200"
                          style={{ color: Colors.primary }}
                        >
                          Clear
                        </button>
                      )}

                      <ComboboxOptions className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-xl bg-white border border-gray-100 shadow-lg z-[9999] py-1">
                        {filteredStaffList.length > 0 ? (
                          filteredStaffList.map((staff) => (
                            <ComboboxOption
                              key={staff.id}
                              value={staff.id.toString()}
                              className={({ active, selected }) =>
                                `relative cursor-pointer select-none py-2 px-4 ${
                                  active ? "bg-purple-50" : ""
                                } ${selected ? "font-bold text-purple-700" : ""}`
                              }
                            >
                              <span style={{ color: Colors.onSurface }}>{staff.name}</span>
                            </ComboboxOption>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">No staff found</div>
                        )}
                      </ComboboxOptions>
                    </div>
                  </Combobox>
                </div>

                {/* Service Select */}
                <div className="relative">
                  <label
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Service *
                  </label>
                  <Combobox
                    value={serviceId}
                    onChange={(val) => {
                      const found = serviceList.find(s => s.id.toString() === val);
                      if (found) {
                        setSelectedService(found);
                        setServiceId(found.id.toString());
                        setServiceSearchQuery(`${found.name}`);
                      }
                    }}
                  >
                    <div className="relative">
                      <ComboboxInput
                        className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none pr-16"
                        style={{ color: Colors.onSurface }}
                        displayValue={() => selectedService ? `${selectedService.name}` : serviceSearchQuery}
                        onChange={(e) => {
                          setServiceSearchQuery(e.target.value);
                          if (selectedService && e.target.value !== `${selectedService.name}`) {
                            setSelectedService(null);
                            setServiceId("");
                          }
                        }}
                        placeholder="Search Service..."
                        autoComplete="off"
                        required={!serviceId}
                      />
                      <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDown size={18} style={{ color: Colors.onSurfaceVariant }} />
                      </ComboboxButton>
                      {selectedService && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedService(null);
                            setServiceId("");
                            setServiceSearchQuery("");
                          }}
                          className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded hover:bg-gray-200"
                          style={{ color: Colors.primary }}
                        >
                          Clear
                        </button>
                      )}

                      <ComboboxOptions className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-xl bg-white border border-gray-100 shadow-lg z-[9999] py-1">
                        {filteredServiceList.length > 0 ? (
                          filteredServiceList.map((service) => (
                            <ComboboxOption
                              key={service.id}
                              value={service.id.toString()}
                              className={({ active, selected }) =>
                                `relative cursor-pointer select-none py-2 px-4 ${
                                  active ? "bg-purple-50" : ""
                                } ${selected ? "font-bold text-purple-700" : ""}`
                              }
                            >
                              <span style={{ color: Colors.onSurface }}>
                                {service.name}
                              </span>
                            </ComboboxOption>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">No services found</div>
                        )}
                      </ComboboxOptions>
                    </div>
                  </Combobox>
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Date *
                </label>
                <input
                  id="date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{ color: Colors.onSurface }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div>
                  <label
                    htmlFor="startTime"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Start Time *
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                    required
                  />
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor="endTime"
                    style={{ color: Colors.onSurfaceVariant }}
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    End Time *
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                    style={{ color: Colors.onSurface }}
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div className="relative">
                <label
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Status *
                </label>
                <Combobox
                  value={status}
                  onChange={(val) => {
                    const found = statuses.find(st => st.value === val);
                    if (found) {
                      setStatus(found.value);
                      setStatusSearchQuery(found.label);
                    }
                  }}
                >
                  <div className="relative">
                    <ComboboxInput
                      className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none pr-16"
                      style={{ color: Colors.onSurface }}
                      displayValue={() => {
                        const option = statuses.find((opt) => opt.value === status);
                        return option ? option.label : statusSearchQuery;
                      }}
                      onChange={(e) => {
                        setStatusSearchQuery(e.target.value);
                        const matched = statuses.find(st => st.label.toLowerCase() === e.target.value.toLowerCase());
                        if (matched) {
                          setStatus(matched.value);
                        } else {
                          setStatus("");
                        }
                      }}
                      placeholder="Search Status..."
                      autoComplete="off"
                      required={!status}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown size={18} style={{ color: Colors.onSurfaceVariant }} />
                    </ComboboxButton>
                    {status && (
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("");
                          setStatusSearchQuery("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded hover:bg-gray-200"
                        style={{ color: Colors.primary }}
                      >
                        Clear
                      </button>
                    )}

                    <ComboboxOptions className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-xl bg-white border border-gray-100 shadow-lg z-[9999] py-1">
                      {filteredStatusList.length > 0 ? (
                        filteredStatusList.map((st) => (
                          <ComboboxOption
                            key={st.value}
                            value={st.value}
                            className={({ active, selected }) =>
                              `relative cursor-pointer select-none py-2 px-4 ${
                                active ? "bg-purple-50" : ""
                              } ${selected ? "font-bold text-purple-700" : ""}`
                            }
                          >
                            <span style={{ color: Colors.onSurface }}>{st.label}</span>
                          </ComboboxOption>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No status found</div>
                      )}
                    </ComboboxOptions>
                  </div>
                </Combobox>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  style={{ color: Colors.onSurfaceVariant }}
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any additional notes..."
                  className="w-full rounded-xl border-none bg-gray-50 px-4 py-3 outline-none"
                  style={{ color: Colors.onSurface }}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl font-bold transition-all"
                  style={{
                    backgroundColor: Colors.surfaceContainerHighest,
                    color: Colors.primary,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl font-bold transition-all"
                  style={{
                    backgroundColor: Colors.primary,
                    color: Colors.onPrimary,
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  {isLoading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
