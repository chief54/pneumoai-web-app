import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Upload Scan Section */}
        <div className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Upload X-Ray Scan</h2>
          <input type="file" className="mb-2" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Analyze
          </button>
        </div>

        {/* View Results Section */}
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>No results yet. Upload a scan first.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
