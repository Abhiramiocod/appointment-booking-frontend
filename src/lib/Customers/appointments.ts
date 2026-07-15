export type AppointmentTab =
    | "pending"
    | "upcoming"
    | "completed";


export interface Appointment {
    id: number;
    appointment_date: string;
    start_time: string;
    end_time: string;
    status: string;
    notes?: string;
    customer?: {
        id: number;
        name: string;
    };
    service?: {
        id: number;
        name: string;
        duration: number;
        price: string;
    };
}