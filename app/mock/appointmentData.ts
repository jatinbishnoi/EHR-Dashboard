import { Appointment, Provider } from '../types/appointment';

export const mockProviders: Provider[] = [
  {
    id: "PR001",
    name: "Dr. Sarah Johnson",
    specialty: "Primary Care",
    schedule: {
      daysAvailable: ["Monday", "Tuesday", "Wednesday", "Friday"],
      startTime: "09:00",
      endTime: "17:00"
    }
  },
  {
    id: "PR002",
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    schedule: {
      daysAvailable: ["Monday", "Thursday", "Friday"],
      startTime: "08:00",
      endTime: "16:00"
    }
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: "APT001",
    start: "2023-09-20T09:00:00",
    end: "2023-09-20T09:30:00",
    patientId: "PT1001",
    patientName: "John Doe",
    providerId: "PR001",
    providerName: "Dr. Sarah Johnson",
    status: "booked",
    type: "Follow-up",
    reason: "Blood pressure check"
  },
  {
    id: "APT002",
    start: "2023-09-20T10:00:00",
    end: "2023-09-20T10:30:00",
    patientId: "PT1002",
    patientName: "Jane Smith",
    providerId: "PR002",
    providerName: "Dr. Michael Chen",
    status: "completed",
    type: "Initial Consultation",
    reason: "Chest pain evaluation"
  }
];