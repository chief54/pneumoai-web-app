import Sidebar from "../components/Sidebar";

export default function Reports() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>
        <div className="bg-gray-100 p-4 rounded">
          <p>System reports will appear here</p>
        </div>
      </div>
    </div>
  );
}
