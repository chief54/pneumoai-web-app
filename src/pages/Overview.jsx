import Sidebar from "../components/Sidebar";

export default function Overview() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Overview</h1>
        <div className="bg-gray-100 p-4 rounded">
          <p>Welcome to the Pneumonia Detection System</p>
        </div>
      </div>
    </div>
  );
}
