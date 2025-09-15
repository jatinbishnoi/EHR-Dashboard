import { NextRequest, NextResponse } from 'next/server';

const EPIC_FHIR_BASE_URL = process.env.EPIC_FHIR_BASE_URL;
const EPIC_FHIR_USERNAME = process.env.EPIC_FHIR_USERNAME;
const EPIC_FHIR_PASSWORD = process.env.EPIC_FHIR_PASSWORD;

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  try {
    const pathParams = context.params.path;
    
    if (!pathParams || pathParams.length === 0) {
      console.error('Missing path parameters');
      return NextResponse.json({ message: 'Invalid path' }, { status: 400 });
    }

    const path = pathParams.join('/');
    const url = `${EPIC_FHIR_BASE_URL}/api/FHIR/DSTU2/${path}`;
    
    // Create base64 encoded credentials for Basic Auth
    const credentials = Buffer.from(`${EPIC_FHIR_USERNAME}:${EPIC_FHIR_PASSWORD}`).toString('base64');
    
    console.log('Attempting to fetch:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/fhir+json',  // Changed content type to FHIR-specific
        'Authorization': `Basic ${credentials}`
      },
      next: { revalidate: 0 } // Disable cache
    });

    // Check if response is OK before trying to parse JSON
    if (!response.ok) {
      console.error('FHIR API Error:', {
        status: response.status,
        statusText: response.statusText
      });
      return NextResponse.json(
        { message: `FHIR server error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('json') || contentType?.includes('fhir');
    
    if (!isJson) {
      console.error('Invalid content type:', contentType);
      return NextResponse.json(
        { message: 'Invalid response format from FHIR server' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Server Error:', {
      name: error instanceof Error ? error.name : 'Unknown Error',
      message: error instanceof Error ? error.message : String(error)
    });
    
    return NextResponse.json(
      { 
        message: 'Failed to fetch from FHIR server', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}