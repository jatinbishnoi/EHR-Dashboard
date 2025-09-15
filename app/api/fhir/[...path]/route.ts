import { NextRequest, NextResponse } from 'next/server';

const EPIC_FHIR_BASE_URL = process.env.EPIC_FHIR_BASE_URL;
const EPIC_FHIR_USERNAME = process.env.EPIC_FHIR_USERNAME;
const EPIC_FHIR_PASSWORD = process.env.EPIC_FHIR_PASSWORD;

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  try {
    // Correct: do NOT use await here
    const pathSegments = context.params.path;

    if (!Array.isArray(pathSegments) || pathSegments.length === 0) {
      return NextResponse.json({ message: 'Invalid path' }, { status: 400 });
    }

    const path = pathSegments.join('/');
    const url = `${EPIC_FHIR_BASE_URL}/api/FHIR/DSTU2/${path}`;
    
    console.log('Full Request URL:', url);

    const credentials = Buffer.from(`${EPIC_FHIR_USERNAME}:${EPIC_FHIR_PASSWORD}`).toString('base64');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
      next: { revalidate: 0 }
    });

    // Log response details for debugging
    console.log('FHIR Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      return NextResponse.json(
        { message: 'Invalid response from FHIR server' },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      console.error('FHIR Error:', {
        status: response.status,
        data: data
      });
      return NextResponse.json({
        message: data.issue?.[0]?.diagnostics || 'FHIR server error',
        status: response.status,
        details: data
      }, { status: response.status });
    }

    return NextResponse.json(data);

  } catch (error) {
    // Enhanced error logging
    console.error('API Route Error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json({
      message: 'Failed to fetch from FHIR server',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}