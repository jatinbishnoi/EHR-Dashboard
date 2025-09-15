"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BookAppointmentDialogProps {
  onAppointmentBooked: () => void;
}

export function BookAppointmentDialog({ onAppointmentBooked }: BookAppointmentDialogProps) {
  const [patientId, setPatientId] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/fhir/stu3/appointment/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parameter: [
            {
              name: "patient",
              valueIdentifier: { value: patientId }
            },
            {
              name: "appointment",
              valueIdentifier: { value: appointmentId }
            },
            {
              name: "appointmentNote",
              valueString: note
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      onAppointmentBooked();
      setPatientId('');
      setAppointmentId('');
      setNote('');
      
    } catch (error) {
      console.error('Booking error:', error);
      // Add error handling UI here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label className="text-sm font-medium mb-1">Patient ID</label>
            <Input
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1">Appointment ID</label>
            <Input
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
              placeholder="Enter appointment ID"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1">Note</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add appointment notes..."
            />
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={loading || !patientId || !appointmentId}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}