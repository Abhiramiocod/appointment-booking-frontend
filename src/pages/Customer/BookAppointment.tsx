import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../lib/api";
import { CheckCircle2 } from "lucide-react";
import Header from "../../components/Customer/BookAppointment/Header";
import Step1 from "../../components/Customer/BookAppointment/Steps/Step1";
import Step2 from "../../components/Customer/BookAppointment/Steps/Step2";
import Step3 from "../../components/Customer/BookAppointment/Steps/Step3";
import Step4 from "../../components/Customer/BookAppointment/Steps/Step4";
import ServiceSelection from "../../components/Customer/BookAppointment/Service";
import StaffSelection from "../../components/Customer/BookAppointment/StaffSelection";
import ScheduleSelection from "../../components/Customer/BookAppointment/ScheduleSelection";
import FinalConfirmation from "../../components/Customer/BookAppointment/FinalConfirmation";
import BookingSummary from "../../components/Customer/BookAppointment/BookingSummary";
import StepperFooter from "../../components/Customer/BookAppointment/StepperFooter";

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
  const location = useLocation();

  // Wizard steps: 1 = Service, 2 = Staff, 3 = Date & Slot, 4 = Confirm
  const [step, setStep] = useState(1);

  // Data lists
  const [services, setServices] = useState<Service[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [slots, setSlots] = useState<string[]>([]);

  // Selection states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
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

  useEffect(() => {
    if (location.state?.preselectedService && services.length > 0) {
      const matched = services.find((s) => s.id === location.state.preselectedService.id);
      if (matched) {
        setSelectedService(matched);
        setStep(2);
      }
    }
  }, [services, location.state]);

  // Fetch staff when service changes
  useEffect(() => {
    if (!selectedService) return;
    const fetchStaff = async () => {
      try {
        setLoading(true);
        setStaffList([]);
        setSelectedStaff(null);
        const response = await api.get(
          `/customer/services/${selectedService.id}/staff`,
        );
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
        const response = await api.get(
          `/customer/staff/${selectedStaff.id}/available-slots`,
          {
            params: {
              service_id: selectedService.id,
              date: selectedDate,
            },
          },
        );
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
    if (!selectedService || !selectedStaff || !selectedDate || !selectedSlot)
      return;
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
      setError(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again.",
      );
    } finally {
      setBooking(false);
    }
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1, width: "100%" }}>
      {/* Messages */}
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

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Step Content */}
        <div className="flex-1 w-full space-y-8">
          {/* Header */}
          <Header step={step} />

          {/* Stepper Indicators */}
          <div className="flex items-center justify-between relative mb-8">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -z-10 -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-indigo-600 -z-10 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>

            {/* Step 1 */}
            <Step1 step={step} setStep={setStep} />

            {/* Step 2 */}
            <Step2 step={step} setStep={setStep} />

            {/* Step 3 */}
            <Step3 step={step} setStep={setStep} />

            {/* Step 4 */}
            <Step4 step={step} />
          </div>

          {/* Wizard Step Content */}
          {/* Step 1: Service */}
          {step === 1 && (
            <ServiceSelection
              loading={loading}
              services={services}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              setStep={setStep}
            />
          )}

          {/* Step 2: Staff */}
          {step === 2 && (
            <StaffSelection
              loading={loading}
              staffList={staffList}
              selectedStaff={selectedStaff}
              setSelectedStaff={setSelectedStaff}
              setStep={setStep}
            />
          )}

          {/* Step 3: Date & Slots */}
          {step === 3 && (
            <ScheduleSelection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              slotsLoading={slotsLoading}
              slots={slots}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          )}

          {/* Step 4: Final Confirmation */}
          {step === 4 && selectedService && selectedStaff && (
            <FinalConfirmation
              selectedService={selectedService}
              selectedStaff={selectedStaff}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              notes={notes}
              setNotes={setNotes}
            />
          )}

          {/* Stepper Footer Controls */}
          <StepperFooter
            step={step}
            setStep={setStep}
            selectedService={selectedService}
            selectedStaff={selectedStaff}
            selectedSlot={selectedSlot}
            handleBook={handleBook}
            booking={booking}
          />
        </div>

        {/* Right Side: Booking Summary Sidebar */}
        <aside className="w-full lg:w-[350px] shrink-0 sticky top-12 mt-44">
          <BookingSummary
            selectedService={selectedService}
            selectedStaff={selectedStaff}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
          />
        </aside>
      </div>
    </div>
  );
}
