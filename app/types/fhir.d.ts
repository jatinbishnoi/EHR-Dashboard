export interface HumanName {
  given?: string[];
  family?: string;
}

export interface ContactPoint {
  system?: "phone" | "email";
  value?: string;
}

export interface Patient {
  id: string;
  name?: HumanName[];
  birthDate?: string;
  gender?: string;
  telecom?: ContactPoint[];
}

// Allergies
export interface AllergyIntolerance {
  id: string;
  code?: {
    text?: string;
  };
  clinicalStatus?: string; // Some DSTU2 may just have string
}

// Conditions
export interface Condition {
  id: string;
  code?: {
    text?: string;
  };
  clinicalStatus?: {
    text?: string;
  };
  verificationStatus?: {
    text?: string;
  };
}

// Medications
export interface MedicationOrder {
  id: string;
  medicationCodeableConcept?: {
    text?: string;
  };
  status?: string;
}

// Immunizations
export interface Immunization {
  id: string;
  vaccineCode?: {
    text?: string;
  };
  date?: string;
}
