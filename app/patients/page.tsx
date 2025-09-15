"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchPatients, getPatientById, APIError } from "../utils/patientAPI";

interface Patient {
  id: string;
  name?: { given?: string[]; family?: string }[];
  birthDate?: string;
  gender?: string;
  telecom?: { system?: string; value?: string }[];
}

export default function PatientListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientId, setPatientId] = useState("");
  const [showRawJson, setShowRawJson] = useState(false); // Add this line

  // Search patients by name/family
  const {
    data: patients,
    refetch: search,
    isLoading: searching,
  } = useQuery<Patient[]>({
    queryKey: ["patients", searchTerm],
    queryFn: () => searchPatients({ family: searchTerm }),
    enabled: false, // manual trigger
  });

  // Get patient by ID
  const {
    data: patient,
    refetch: getById,
    isLoading: fetchingById,
    error: patientError,
  } = useQuery<Patient, APIError>({
    queryKey: ["patient", patientId],
    queryFn: () => getPatientById(patientId),
    enabled: false,
    retry: false, // Don't retry on error
  });

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Patients</h1>

      {/* Patient.Search */}
      <div className="mb-8 border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Search Patients by Family Name
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Family name..."
            className="border border-gray-300 p-2.5 flex-1 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors font-medium"
            onClick={() => search()}
          >
            Search
          </button>
        </div>

        {searching && <p className="mt-4 text-gray-600">Searching...</p>}

        {patients && patients.length > 0 && (
          <ul className="mt-6 space-y-3">
            {patients.map((p) => (
              <li
                key={p.id}
                className="border border-gray-200 p-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                <p className="text-gray-700">
                  <strong className="text-gray-900">ID:</strong> {p.id}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Name:</strong>{" "}
                  {p.name?.[0]?.given?.join(" ")} {p.name?.[0]?.family}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">DOB:</strong> {p.birthDate}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Patient.Read */}
      <div className="mb-8 border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Get Patient by ID
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Patient ID..."
            className="border border-gray-300 p-2.5 flex-1 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-6 py-2.5 rounded-md hover:bg-green-600 transition-colors font-medium"
            onClick={() => {
              getById();
              setShowRawJson(true);
            }}
          >
            Get Patient
          </button>
        </div>

        {fetchingById && <p className="mt-4 text-gray-600">Fetching patient...</p>}

        {patientError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">
              Error: {patientError.message}
              {patientError.status && ` (Status: ${patientError.status})`}
            </p>
            <p className="text-sm text-red-600 mt-1">
              Please verify the patient ID and try again. If the problem persists, contact support.
            </p>
          </div>
        )}

        {patient && (
          <>
            <div className="mt-6 border border-gray-200 p-4 rounded-md space-y-2">
              <p className="text-gray-700">
                <strong className="text-gray-900">ID:</strong> {patient.id}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Name:</strong> {patient.name?.[0]?.given?.join(" ")}{" "}
                {patient.name?.[0]?.family}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">DOB:</strong> {patient.birthDate}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Gender:</strong> {patient.gender}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Contact:</strong>{" "}
                {patient.telecom?.map((t) => t.value).join(", ")}
              </p>
            </div>

            {showRawJson && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Raw JSON Response:
                </h3>
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96 border border-gray-200 text-sm font-mono text-gray-800">
                  {JSON.stringify(patient, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
