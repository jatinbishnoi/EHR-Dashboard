interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent) => void;
}

export default function SearchForm({ value, onChange, onSearch }: Props) {
  return (
    <form onSubmit={onSearch} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Search by last name"
        className="border p-2 rounded flex-1"
        value={value}
        onChange={onChange}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">Search</button>
    </form>
  );
}
