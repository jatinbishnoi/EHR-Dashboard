export default function Topbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center ml-64">
      <h2 className="text-xl font-semibold">Welcome, User</h2>
      <div className="flex items-center gap-4">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Profile</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Logout</button>
      </div>
    </header>
  );
}
