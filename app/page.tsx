import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to the EHR Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Use the menu or the links below to navigate through patient management and other modules.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li>
            <Link
              href="/patients"
              className="block p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-semibold hover:bg-blue-100 hover:scale-105 transition-transform duration-200"
            >
              View / Search Patients
            </Link>
          </li>

          {/* Example placeholder for other modules */}
          <li>
            <Link
              href="/appointments"
              className="block p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold hover:bg-green-100 hover:scale-105 transition-transform duration-200"
            >
              Manage Appointments
            </Link>
          </li>

          <li>
            <Link
              href="/billing"
              className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 font-semibold hover:bg-yellow-100 hover:scale-105 transition-transform duration-200"
            >
              Billing & Reports
            </Link>
          </li>

          <li>
            <Link
              href="/clinical"
              className="block p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 font-semibold hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
            >
              Clinical Operations
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
