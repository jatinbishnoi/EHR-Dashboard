"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockAppointments, mockProviders } from '../mock/appointmentData';
import { BookAppointmentDialog } from '../components/BookAppointmentDialog';

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProvider, setSelectedProvider] = useState<string>('all');

  const filteredAppointments = mockAppointments.filter(apt => {
    const matchesDate = selectedDate 
      ? new Date(apt.start).toDateString() === selectedDate.toDateString()
      : true;
    const matchesProvider = selectedProvider === 'all' 
      ? true 
      : apt.providerId === selectedProvider;
    return matchesDate && matchesProvider;
  });

  const handleAppointmentBooked = () => {
    // Refresh appointments list
    // You might want to add a refresh mechanism here
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <BookAppointmentDialog onAppointmentBooked={handleAppointmentBooked} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Provider</label>
                <Select 
                  value={selectedProvider} 
                  onValueChange={setSelectedProvider}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    {mockProviders.map(provider => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="md:col-span-2">
          <div className="border rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                Appointments {selectedDate && `for ${selectedDate.toLocaleDateString()}`}
              </h2>
            </div>
            <div className="divide-y">
              {filteredAppointments.map(appointment => (
                <div key={appointment.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.patientName}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.start).toLocaleTimeString()} - 
                        {new Date(appointment.end).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-600">{appointment.reason}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs
                        ${appointment.status === 'booked' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                        {appointment.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{appointment.providerName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}