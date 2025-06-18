import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-6 mt-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Email</h2>
            <p>aboagyegerald56@gmail.com</p>
          </div>
          <div>
            <h2 className="font-semibold">Phone</h2>
            <p>233 534559830</p>
          </div>
          <div>
            <h2 className="font-semibold">Address</h2>
            <p>kumasi, Ghana</p>
          </div>
        </div>
      </div>
    </div>
  );
}
