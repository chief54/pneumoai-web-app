import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">About</h1>
        <p>This system helps detect pneumonia from chest X-rays using AI.</p>
      </div>
    </div>
  );
}
