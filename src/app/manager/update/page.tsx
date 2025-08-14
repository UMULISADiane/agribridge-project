

'use client';
import React from 'react';
import Link from 'next/link';

import { ChangeEvent, FormEvent, useState } from 'react';

export default function Update() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: '',
    phone: '',
     idPhoto: null as File | null,
    bank: '',
  
  });

 const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target as HTMLInputElement;
  const { name, value } = target;

  setForm((prev) => ({
    ...prev,
    [name]: target.type === 'file' ? target.files?.[0] || null : value,
  }));
};


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <Link href="/manager/users">
  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
    ← Go back to the user
  </button>
</Link>

      <h1 className="text-2xl font-bold text-center mb-6 text-green-700">
        Add / Update User
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Select Role --</option>
            <option value="farmer">Farmer</option>
            <option value="driver">Driver</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Telephone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
         <div>
          <label className="block mb-1 font-medium">ID Photo</label>
          <input
            type="file"
            name="idPhoto"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bank Account Number</label>
          <input
            type="text"
            name="bank"
            value={form.bank}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

      
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
    </main>
  );
}