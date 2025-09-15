📄 API Discovery Document
Project: EHR Integration Dashboard
Version: MVP
1. APIs Discovered
Patient APIs (DSTU2)

Patient.Search (DSTU2)

Method: GET

URL Template:

/api/FHIR/DSTU2/Patient?_id={_id}&identifier={identifier}&family={family}&given={given}&birthdate={birthdate}&address={address}&gender={gender}&telecom={telecom}


Description: Search for patients using demographic or identifier fields.

Patient.Read (DSTU2)

Method: GET

URL Template:

/api/FHIR/DSTU2/Patient/{ID}


Description: Fetches patient details by resource ID.

Appointment APIs (STU3)

Appointment.$book (STU3) (Industry Standard)

Method: POST

URL Template:

/api/FHIR/STU3/Appointment/$book


Description: Books an appointment slot for a patient. Requires appointment resource payload with patient reference, practitioner, and slot info.

Appointment.$find (STU3) (Industry Standard)

Method: POST

URL Template:

/api/FHIR/STU3/Appointment/$find


Description: Searches available appointment slots based on criteria (date, practitioner, specialty, location).

Account APIs (Premium Billing - R4)

Account.Read (R4) (Industry Standard)

Method: GET

URL Template:

/api/FHIR/R4/Account/{ID}


Description: Retrieves billing account details by ID.

Account.Search (R4) (Industry Standard)

Method: GET

URL Template:

/api/FHIR/R4/Account?_id={_id}


Description: Search billing accounts using internal ID.

2. Capabilities Identified

✅ Cross-version FHIR support (DSTU2, STU3, R4).
✅ Appointment booking and slot search workflows.
✅ Patient demographics fully supported.
✅ Billing account lookups and detail retrieval.

3. Limitations Identified

⚠️ Appointment APIs require precise payload formatting.
⚠️ Billing APIs (R4) may include sensitive PHI/financial data → requires secure handling.
⚠️ Multi-version FHIR adds complexity in serialization & validation.

4. Integration Approach & Architecture Decisions

Patients (DSTU2) → Core demographics module.

Appointments (STU3) → Scheduling module.

Accounts (R4) → Billing module.

Architecture: Modular service layer (services/patientService.ts, services/appointmentService.ts, services/accountService.ts).

Versioning: APIs grouped by FHIR version in folder structure.

React Query: Used across all modules for caching, retries, pagination.

📄 Implementation Guide
1. How the Integration Works

Patients: Search or retrieve details → displayed in patient dashboard.

Appointments:

$find → search available slots.

$book → confirm booking with payload.

Accounts: Lookup patient’s billing account and display billing summary.

2. Command Processing Logic

Patient:

Search query params → GET results.

ID click → Read endpoint.

Appointment:

$find → POST criteria (date, provider) → returns slots.

$book → POST appointment request → returns confirmation.

Account:

Search → GET by _id.

Read → GET by {ID}.

3. State Management Approach

React Query for all API states.

Cache separation per resource (patients, appointments, accounts).

Search filters → local state, results → query cache.

4. Error Handling Strategies

400 → invalid search payload (UI validation).

401 → invalid credentials (redirect to credential setup).

403 → insufficient permissions (role-based UI blocking).

404 → no resource found (graceful empty state UI).

500 → API/server error (toast + retry).

5. Performance Optimizations

Query caching with version-based keys.

Pagination in patient/appointment search.

Lazy loading appointment/billing modules.

Optimistic updates for booking (faster UI feedback).