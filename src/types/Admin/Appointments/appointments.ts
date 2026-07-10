export interface AppointmentDto {
    id: number;
    customer?: {
        id: number;
        name: string;
    };
    staff?: {
        id: number;
        name: string;
    };
    service?: {
        id: number;
        name: string;
        duration: number;
        price: string;
    };
    appointment_date: string;
    start_time: string;
    end_time: string;
    status: string;
    notes: string;
    created_at: string;
    updated_at: string;
}

export interface AppointmentViewModel {
    id: number;
    initials: string;
    customerName: string;
    customerEmail: string;
    serviceName: string;
    staffName: string;
    formattedDate: string;
    formattedTime: string;
    status: string;
    duration: string;
    history: AppointmentHistory[];
    dto: AppointmentDto;
}

export interface AppointmentHistory {
    date: string;
    detail: string;
    current: boolean;
}