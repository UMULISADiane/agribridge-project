'use client';
import React, { useState } from 'react';

export default function UploadPage() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return alert('Please upload a product image');

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await fetch('/api/farmer/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        setProductName('');
        setQuantity('');
        setPrice('');
        setDescription('');
        setImage(null);
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
          Upload Your New Product
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">Product Image</label>
            <input
              type="file"
              className="w-full border border-gray-300 p-2 rounded"
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              placeholder="e.g. Irish Potatoes"
              className="w-full border border-gray-300 p-2 rounded"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Quantity (in kg)</label>
            <input
              type="number"
              placeholder="e.g. 100"
              className="w-full border border-gray-300 p-2 rounded"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price (in RWF)</label>
            <input
              type="number"
              placeholder="e.g. 1200"
              className="w-full border border-gray-300 p-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              placeholder="Brief description of your product"
              className="w-full border border-gray-300 p-2 rounded"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
