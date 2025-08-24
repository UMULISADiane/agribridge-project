"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function UpdateUser() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
    phone: "",
    idPhoto: null as File | null,
    bank: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("role", form.role);
    formData.append("phone", form.phone);
    if (form.idPhoto) {
      formData.append("idPhoto", form.idPhoto);
    }
    formData.append("bank", form.bank);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("API Response:", result);
      alert("✅ User updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update user.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/manager/users">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
            ← Go back to the users
          </button>
        </Link>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select Role</option>
              <option value="Farmer">Farmer</option>
              <option value="Wholesaler">Wholesaler</option>
              <option value="Driver">Driver</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* ID Photo */}
          <div>
            <label className="block font-medium">ID Photo</label>
            <input
              type="file"
              name="idPhoto"
              accept="image/*"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block font-medium">Bank</label>
            <input
              type="text"
              name="bank"
              value={form.bank}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
