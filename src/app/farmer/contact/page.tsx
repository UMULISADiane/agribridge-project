

'use client';
import React, { useState } from 'react';

export default function UploadPage() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Location, setLocation] = useState('');
  const [Message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    const formData = new FormData();
    formData.append('Name', Name);
    formData.append('Email', Email);
    formData.append('Location', Location);
    formData.append('Message', Message);
  

    try {
      const res = await fetch('/api/farmer/contact', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        setName('');
        setEmail('');
        setLocation('');
        setMessage('');
        
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Contact US
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
        

          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder=""
              className="w-full border border-gray-300 p-2 rounded"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="string"
              placeholder="e.g.user@gmail.com"
              className="w-full border border-gray-300 p-2 rounded"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              placeholder="eg.kigali, Rwanda"
              className="w-full border border-gray-300 p-2 rounded"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              placeholder="Your message here..."
              className="w-full border border-gray-300 p-2 rounded"
              rows={3}
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Send message
          </button>
        </form>
      </div>
    </main>
  );
}