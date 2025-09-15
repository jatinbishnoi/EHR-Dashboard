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

// Get patient by ID
export async function getPatientById(id: string): Promise<Patient> {
  try {
    console.log('Fetching patient with ID:', id);
    
    if (!id) {
      throw new Error('Patient ID is required');
    }

    const res = await clientDSTU.get(`Patient/${id}`, {
      validateStatus: status => status < 500
    });

    if (!res.data) {
      throw new Error('No data received from FHIR server');
    }

    return res.data;
  } catch (error: any) {
    console.error('Get Patient Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    throw {
      message: error.response?.data?.message || 'Failed to fetch patient data',
      status: error.response?.status || 500,
      details: error.response?.data || error.message
    };
  }
}

// Search patients
export async function searchPatients(params: any) {
  try {
    console.log('Searching patients with params:', params);

    const res = await clientDSTU.get('Patient', { 
      params,
      validateStatus: status => status < 500
    });

    if (!res.data?.entry) {
      return [];
    }

    return res.data.entry.map((e: any) => e.resource);
  } catch (error: any) {
    console.error('Search Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    throw {
      message: error.response?.data?.message || 'Failed to search patients',
      status: error.response?.status || 500,
      details: error.response?.data || error.message
    };
  }
}
