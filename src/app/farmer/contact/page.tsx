


'use client';
export default function Contact() {
  return (
     <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Contact Us
      </h1>
      <h3 className="mb-4 text-gray-600">
        Have a question or feedback? Fill out the form below and our team will get back to you soon.
      </h3>

      <form className="space-y-4">

        <div>
          <label className="block font-semibold mb-1 from-blue-100 to-white"> Name</label>
          <input
            type="text"
            placeholder=""
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 from-blue-100 to-white">Email</label>
          <input
            type="email"
            placeholder="e.g. user@example.com"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 from-blue-100 to-white">Location</label>
          <input
            type="text"
            placeholder="e.g. Kigali, Rwanda"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 from-blue-100 to-white">Message</label>
          <textarea
            placeholder=""
            className="w-full border border-gray-300 p-2 rounded"
            rows={3}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Send the message
        </button>
      </form>
    </div>
    </main>
  );
}