import { NextRequest, NextResponse } from 'next/server';

const EPIC_FHIR_BASE_URL = process.env.EPIC_FHIR_BASE_URL;
const EPIC_FHIR_USERNAME = process.env.EPIC_FHIR_USERNAME;
const EPIC_FHIR_PASSWORD = process.env.EPIC_FHIR_PASSWORD;

// For debugging purposes
interface FHIRParameters {
  resourceType: "Parameters";
  parameter: Array<Record<string, unknown>>;
}

const logRequestDetails = (url: string, headers: HeadersInit, body: FHIRParameters) => {
  console.log('Request URL:', url);
  console.log('Request Headers:', headers);
  console.log('Request Body:', JSON.stringify(body, null, 2));
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = `${EPIC_FHIR_BASE_URL}/FHIR/STU3/Appointment/$book`;
    
    const headers = {
      'Accept': 'application/fhir+json',
      'Content-Type': 'application/fhir+json',
      'Authorization': `Basic ${Buffer.from(`${EPIC_FHIR_USERNAME}:${EPIC_FHIR_PASSWORD}`).toString('base64')}`,
      'Epic-Client-ID': 'your_client_id', // Add if required by Epic
    };

    const requestBody: FHIRParameters = {
      resourceType: "Parameters",
      parameter: body.parameter
    };

    // Log request details for debugging
    logRequestDetails(url, headers, requestBody);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
      cache: 'no-store'
    });

    // Log response details
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

    let responseData;
    const responseText = await response.text();
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.log('Raw Response:', responseText);
      throw new Error('Invalid JSON response from FHIR server');
    }

    if (!response.ok) {
      return NextResponse.json({
        message: 'FHIR server error',
        status: response.status,
        error: responseData
      }, { status: response.status });
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Detailed error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json({
      message: 'Failed to book appointment',
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}