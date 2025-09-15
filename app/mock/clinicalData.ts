// Clinical Notes
export const mockClinicalNotes = [
  { id: "CN001", date: "2023-09-01", author: "Dr. Smith", note: "Patient reports mild headache. No neurological deficits. Advised hydration and rest." },
  { id: "CN002", date: "2023-09-10", author: "Dr. Lee", note: "Follow-up: headache resolved. No recurrence. Patient feels well." },
  { id: "CN003", date: "2023-09-15", author: "Dr. Patel", note: "Annual physical completed. No new complaints. Vaccinations up to date." }
];

// Vital Signs
export const mockVitals = [
  { date: "2023-09-01", bp: "120/80", hr: 72, temp: 98.6, rr: 16, spo2: 98, weight: 165, height: 68 },
  { date: "2023-09-10", bp: "118/78", hr: 70, temp: 98.4, rr: 16, spo2: 99, weight: 164, height: 68 },
  { date: "2023-09-15", bp: "122/82", hr: 74, temp: 98.7, rr: 17, spo2: 98, weight: 166, height: 68 }
];

// Lab Results
export const mockLabs = [
  { id: "LAB001", date: "2023-09-02", test: "CBC", result: "Normal", details: "WBC 6.2, Hgb 14.1, Plt 250" },
  { id: "LAB002", date: "2023-09-11", test: "Lipid Panel", result: "Elevated LDL", details: "LDL 145, HDL 52, Trig 120" },
  { id: "LAB003", date: "2023-09-15", test: "HbA1c", result: "Normal", details: "5.4%" }
];

// Medications
export const mockMedications = [
  { name: "Atorvastatin", dose: "10mg", frequency: "Once daily", status: "Active", start: "2023-09-11", prescribingProvider: "Dr. Lee" },
  { name: "Lisinopril", dose: "5mg", frequency: "Once daily", status: "Active", start: "2023-08-01", prescribingProvider: "Dr. Smith" },
  { name: "Ibuprofen", dose: "200mg", frequency: "As needed", status: "Inactive", start: "2023-09-01", end: "2023-09-05", prescribingProvider: "Dr. Smith" }
];

// Diagnoses & Procedures
export const mockDiagnoses = [
  { code: "I10", description: "Essential (primary) hypertension", date: "2023-08-01", provider: "Dr. Smith" },
  { code: "E78.5", description: "Hyperlipidemia, unspecified", date: "2023-09-11", provider: "Dr. Lee" },
  { code: "Z00.00", description: "General adult medical exam", date: "2023-09-15", provider: "Dr. Patel" }
];

export const mockProcedures = [
  { code: "93000", description: "Electrocardiogram", date: "2023-09-01", provider: "Dr. Smith" },
  { code: "71020", description: "Chest X-ray", date: "2023-09-10", provider: "Dr. Lee" }
];

// Patient History & Encounters
export const mockHistory = [
  { date: "2023-08-15", type: "Annual Physical", provider: "Dr. Smith", summary: "Routine checkup, all normal." },
  { date: "2023-09-01", type: "Follow-up", provider: "Dr. Lee", summary: "Headache resolved, no issues." },
  { date: "2023-09-15", type: "Lab Review", provider: "Dr. Patel", summary: "Labs within normal limits." }
];