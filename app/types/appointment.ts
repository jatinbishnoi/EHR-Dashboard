export interface Appointment {
  id: string;
  start: string;
  end: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  status: 'booked' | 'cancelled' | 'pending' | 'arrived' | 'completed';
  type: string;
  reason: string;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  schedule: {
    daysAvailable: string[];
    startTime: string;
    endTime: string;
  };
}

export interface AppointmentSlot {
  start: string;
  end: string;
  available: boolean;
  providerId: string;
}