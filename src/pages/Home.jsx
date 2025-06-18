import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">Pneumonia Detection System</h1>
        <p className="mt-4">AI-powered chest X-ray analysis</p>
      </div>
    </div>
  );
}
