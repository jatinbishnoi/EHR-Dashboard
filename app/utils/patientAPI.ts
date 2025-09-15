/* eslint-disable @typescript-eslint/no-explicit-any */
import clientDSTU from "./fhirClientDSTU";

interface Patient {
  id: string;
  name?: { given?: string[]; family?: string }[];
  birthDate?: string;
  gender?: string;
  telecom?: { system?: string; value?: string }[];
}

export interface APIError {
  status?: number;
  message: string;
}

// Search patients
export async function searchPatients(params: any) {
  try {
    const res = await clientDSTU.get("/Patient", { 
      params,
      validateStatus: status => status < 500 
    });
    return res.data.entry?.map((e: any) => e.resource) || [];
  } catch (error: any) {
    console.error('Search Error:', error.response?.data);
    throw {
      message: error.response?.data?.message || 'Failed to search patients',
      status: error.response?.status
    };
  }
}

// Get patient by ID
export async function getPatientById(id: string): Promise<Patient> {
  try {
    const res = await clientDSTU.get(`/Patient/${id}`, {
      validateStatus: status => status < 500
    });
    return res.data;
  } catch (error: any) {
    console.error('Get Patient Error:', error.response?.data);
    throw {
      message: error.response?.data?.message || 'Failed to fetch patient data',
      status: error.response?.status
    };
  }
}
