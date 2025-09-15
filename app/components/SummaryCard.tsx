interface SummaryCardProps {
  title: string;
  value: number | string;
  color?: string; // optional for customization
}

export default function SummaryCard({ title, value, color = "bg-blue-500" }: SummaryCardProps) {
  return (
    <div className={`p-4 rounded shadow ${color} text-white flex flex-col items-center`}>
      <h3 className="text-gray-200 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
