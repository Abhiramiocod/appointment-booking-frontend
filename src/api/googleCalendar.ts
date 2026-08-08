import api from "../lib/api";

export interface GoogleCalendarStatus {
  connected: boolean;
  google_email: string | null;
  expires_at?: string | null;
}

export const getGoogleCalendarStatus = async (): Promise<GoogleCalendarStatus> => {
  const res = await api.get<GoogleCalendarStatus>("/calendar/google/status");
  return res.data;
};

export const getGoogleCalendarConnectUrl = (): string => {
  const backendUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  return `${backendUrl}/calendar/google/connect${token ? `?bearer_token=${token}` : ""}`;
};

export const disconnectGoogleCalendar = async (): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>("/calendar/google/disconnect");
  return res.data;
};
