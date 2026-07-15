import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Colors } from "../../lib/utils";
import { Sparkles, User, Calendar, Clock, Loader2, ChevronRight, CheckCircle2, ChevronLeft } from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: number;
  description: string;
}

interface Staff {
  id: number;
  name: string;
  email: string;
  staff_profile?: {
    bio?: string;
    experience_years?: number;
  };
}

export default function BookAppointment() {
  const navigate = useNavigate();

  // Wizard steps: 1 = Service, 2 = Staff, 3 = Date & Slot, 4 = Confirm
  const [step, setStep] = useState(1);

  // Data lists
  const [services, setServices] = useState<Service[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [slots, setSlots] = useState<string[]>([]);

  // Selection states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // Loading & feedback
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch all services on load
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.get("/customer/services");
        setServices(response.data?.data || response.data || []);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load services. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Fetch staff when service changes
  useEffect(() => {
    if (!selectedService) return;
    const fetchStaff = async () => {
      try {
        setLoading(true);
        setStaffList([]);
        setSelectedStaff(null);
        const response = await api.get(`/customer/services/${selectedService.id}/staff`);
        setStaffList(response.data?.data || response.data || []);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load staff list for selected service.");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [selectedService]);

  // Fetch slots when staff or date changes
  useEffect(() => {
    if (!selectedService || !selectedStaff || !selectedDate) return;
    const fetchSlots = async () => {
      try {
        setSlotsLoading(true);
        setSlots([]);
        setSelectedSlot(null);
        const response = await api.get(`/customer/staff/${selectedStaff.id}/available-slots`, {
          params: {
            service_id: selectedService.id,
            date: selectedDate,
          },
        });
        setSlots(response.data?.data || response.data || []);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load available time slots.");
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [selectedStaff, selectedDate, selectedService]);

  const handleBook = async () => {
    if (!selectedService || !selectedStaff || !selectedDate || !selectedSlot) return;
    setBooking(true);
    setError(null);

    try {
      await api.post("/customer/appointments", {
        service_id: selectedService.id,
        staff_id: selectedStaff.id,
        appointment_date: selectedDate,
        start_time: selectedSlot,
        notes,
      });

      setSuccess("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/customer/schedule");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, maxWidth: 850 }}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Sparkles size={18} />
            </div>
            Book Appointment
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Complete the steps below to schedule your premium booking.
          </p>
        </div>
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs font-semibold px-3 py-1.5 border rounded-lg bg-white shadow-sm"
          >
            <ChevronLeft size={14} /> Back
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200/60 text-red-700 text-xs rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2.5">
          <CheckCircle2 className="text-emerald-600" size={20} />
          <div>
            <p className="font-bold text-sm">Success!</p>
            <p className="text-xs">{success}</p>
          </div>
        </div>
      )}

      {/* Steps indicators */}
      <div className="flex items-center gap-2 mb-8 bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm overflow-x-auto">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${step === 1 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>1. Service</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${step === 2 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>2. Specialist</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${step === 3 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>3. Slot</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${step === 4 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>4. Confirm</span>
      </div>

      {/* Step 1: Services */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Select a Service</h3>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => {
                    setSelectedService(srv);
                    setStep(2);
                  }}
                  className={`p-5 bg-white border rounded-xl cursor-pointer hover:shadow-md transition-all ${
                    selectedService?.id === srv.id ? "border-indigo-600 ring-2 ring-indigo-50" : "border-slate-200/80"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800">{srv.name}</h4>
                    <span className="text-indigo-600 font-bold">${srv.price}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{srv.description || "Premium styling package."}</p>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-semibold">{srv.duration} mins</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Staff */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Choose a Specialist</h3>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600" /></div>
          ) : staffList.length === 0 ? (
            <p className="text-slate-400 italic text-sm">No specialists currently offer this service.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffList.map((stf) => (
                <div
                  key={stf.id}
                  onClick={() => {
                    setSelectedStaff(stf);
                    setStep(3);
                  }}
                  className={`p-5 bg-white border rounded-xl cursor-pointer hover:shadow-md transition-all flex items-start gap-4 ${
                    selectedStaff?.id === stf.id ? "border-indigo-600 ring-2 ring-indigo-50" : "border-slate-200/80"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border flex items-center justify-center font-bold text-indigo-600 shrink-0">
                    {stf.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{stf.name}</h4>
                    <p className="text-xs text-slate-500 mb-1">{stf.email}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-2 italic">{stf.staff_profile?.bio || "Professional stylist."}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Date & Slot */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Pick Date & Time</h3>
          
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={14} /> Appointment Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2 text-sm border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock size={14} /> Available Slots
              </label>
              
              {slotsLoading ? (
                <div className="flex justify-center py-4"><Loader2 className="animate-spin text-indigo-600" size={20} /></div>
              ) : slots.length === 0 ? (
                <p className="text-slate-400 italic text-xs">No slots available on this date. Please choose another date.</p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        selectedSlot === slot
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedSlot && (
            <button
              onClick={() => setStep(4)}
              style={{ background: Colors.primary }}
              className="w-full py-2.5 text-white rounded-lg text-xs font-semibold transition-all hover:brightness-105"
            >
              Continue to Confirmation
            </button>
          )}
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && selectedService && selectedStaff && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Confirm Booking Details</h3>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Service</p>
                <p className="font-bold text-slate-800">{selectedService.name}</p>
                <p className="text-xs text-slate-500">${selectedService.price} • {selectedService.duration} mins</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Specialist</p>
                <p className="font-bold text-slate-800">{selectedStaff.name}</p>
                <p className="text-xs text-slate-500">{selectedStaff.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-sans">Date</p>
                <p className="font-bold text-slate-800">{selectedDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Time Slot</p>
                <p className="font-bold text-slate-800">{selectedSlot}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Booking Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests or details..."
                className="w-full bg-slate-50/50 rounded-lg px-3.5 py-2.5 text-xs border focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[80px]"
              />
            </div>
          </div>

          <button
            onClick={handleBook}
            disabled={booking}
            style={{
              background: "linear-gradient(135deg, #4648d4, #6366f1)",
            }}
            className="w-full py-3 text-white rounded-lg text-sm font-semibold transition-all hover:brightness-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {booking ? <Loader2 size={16} className="animate-spin" /> : null}
            {booking ? "Booking..." : "Confirm & Book Appointment"}
          </button>
        </div>
      )}
    </div>
  );
}
