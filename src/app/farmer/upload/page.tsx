 'use client';
 import React from 'react';

export default function UploadPage() {
  return (
     <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
         Upload Your new  Product
      </h1>

      <form className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Product Image</label>
          <input
            type="file"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            placeholder="e.g. Irish Potatoes"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity (in kg)</label>
          <input
            type="number"
            placeholder="e.g. 100"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price (in RWF)</label>
          <input
            type="number"
            placeholder="e.g. 1200"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            placeholder="Brief description of your product"
            className="w-full border border-gray-300 p-2 rounded"
            rows={3}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
     </main>
  );
}