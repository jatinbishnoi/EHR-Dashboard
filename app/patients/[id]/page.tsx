"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import clientDSTU from "@/app/utils/fhirClientDSTU";

// Minimal Patient interface
interface HumanName {
  given?: string[];
  family?: string;
}

interface ContactPoint {
  system?: "phone" | "email";
  value?: string;
}

interface Patient {
  id: string;
  name?: HumanName[];
  birthDate?: string;
  gender?: string;
  telecom?: ContactPoint[];
}

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;

  const [activeTab, setActiveTab] = useState<"Demographics">("Demographics");

  // Correctly type the query
  const { data: patient, isLoading } = useQuery<Patient>({
    queryKey: ["patient", patientId],
    queryFn: async () => {
      const res = await clientDSTU.get(`/Patient/${patientId}`);
      return res.data as Patient;
    },
    enabled: !!patientId
  });

  if (isLoading) return <p className="p-6">Loading patient details...</p>;
  if (!patient) return <p className="p-6">No patient found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>

      <div className="flex gap-2 border-b mb-4">
        <button className="px-4 py-2 font-semibold border-b-2 border-blue-500 text-blue-500">
          Demographics
        </button>
      </div>

      <div className="p-4 border">
        <p><strong>ID:</strong> {patient.id}</p>
        <p>
          <strong>Name:</strong> {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
        </p>
        <p><strong>DOB:</strong> {patient.birthDate}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p>
          <strong>Contact:</strong> {patient.telecom?.map((t) => t.value).join(", ")}
        </p>
      </div>
    </div>
  );
}
