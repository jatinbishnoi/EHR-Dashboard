"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  mockClinicalNotes,
  mockVitals,
  mockLabs,
  mockMedications,
  mockDiagnoses,
  mockProcedures,
  mockHistory
} from "../mock/clinicalData";

export default function ClinicalPage() {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Clinical Operations</h1>
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="meds">Medications</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Clinical Notes */}
        <TabsContent value="notes">
          <Card>
            <CardHeader className="text-xl font-semibold">Clinical Notes</CardHeader>
            <CardContent>
              <ul>
                {mockClinicalNotes.map(note => (
                  <li key={note.id} className="mb-2">
                    <span className="font-medium">{note.date}</span> - {note.author}: {note.note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vital Signs */}
        <TabsContent value="vitals">
          <Card>
            <CardHeader className="text-xl font-semibold">Vital Signs</CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Date</th><th>BP</th><th>HR</th><th>Temp</th><th>RR</th><th>SpO₂</th><th>Weight (lb)</th><th>Height (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockVitals.map((v, i) => (
                    <tr key={i}>
                      <td>{v.date}</td>
                      <td>{v.bp}</td>
                      <td>{v.hr}</td>
                      <td>{v.temp}</td>
                      <td>{v.rr}</td>
                      <td>{v.spo2}</td>
                      <td>{v.weight}</td>
                      <td>{v.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Results */}
        <TabsContent value="labs">
          <Card>
            <CardHeader className="text-xl font-semibold">Lab Results</CardHeader>
            <CardContent>
              <ul>
                {mockLabs.map(lab => (
                  <li key={lab.id} className="mb-2">
                    <span className="font-medium">{lab.date}</span> - {lab.test}: {lab.result}
                    <button
                      className="ml-2 text-blue-600 underline text-xs"
                      onClick={() => setShowDetails(lab.id)}
                    >
                      Details
                    </button>
                    {showDetails === lab.id && (
                      <div className="bg-gray-50 border rounded p-2 mt-1 text-sm">
                        {lab.details}
                        <button
                          className="ml-4 text-red-600 underline"
                          onClick={() => setShowDetails(null)}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medications */}
        <TabsContent value="meds">
          <Card>
            <CardHeader className="text-xl font-semibold">Medications</CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Name</th><th>Dose</th><th>Frequency</th><th>Status</th><th>Start</th><th>End</th><th>Prescriber</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMedications.map((med, i) => (
                    <tr key={i}>
                      <td>{med.name}</td>
                      <td>{med.dose}</td>
                      <td>{med.frequency}</td>
                      <td>{med.status}</td>
                      <td>{med.start}</td>
                      <td>{med.end || "-"}</td>
                      <td>{med.prescribingProvider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diagnoses */}
        <TabsContent value="diagnoses">
          <Card>
            <CardHeader className="text-xl font-semibold">Diagnoses</CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Code</th><th>Description</th><th>Date</th><th>Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDiagnoses.map((dx, i) => (
                    <tr key={i}>
                      <td>{dx.code}</td>
                      <td>{dx.description}</td>
                      <td>{dx.date}</td>
                      <td>{dx.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Procedures */}
        <TabsContent value="procedures">
          <Card>
            <CardHeader className="text-xl font-semibold">Procedures</CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Code</th><th>Description</th><th>Date</th><th>Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProcedures.map((proc, i) => (
                    <tr key={i}>
                      <td>{proc.code}</td>
                      <td>{proc.description}</td>
                      <td>{proc.date}</td>
                      <td>{proc.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history">
          <Card>
            <CardHeader className="text-xl font-semibold">Patient History & Encounters</CardHeader>
            <CardContent>
              <ul>
                {mockHistory.map((h, i) => (
                  <li key={i} className="mb-2">
                    <span className="font-medium">{h.date}</span> - {h.type} ({h.provider}): {h.summary}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}