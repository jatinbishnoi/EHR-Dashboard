import Link from "next/link";
import { Patient } from "../types/fhir";

interface Props {
  patients?: Patient[];
}

export default function PatientTable({ patients }: Props) {
  if (!patients || patients.length === 0) return <p>No patients found.</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">DOB</th>
          <th className="border p-2">Gender</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td className="border p-2">
              <Link href={`/patients/${p.id}`}>{p.id}</Link>
            </td>
            <td className="border p-2">{p.name?.[0]?.given?.[0]}</td>
            <td className="border p-2">{p.name?.[0]?.family}</td>
            <td className="border p-2">{p.birthDate}</td>
            <td className="border p-2">{p.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
