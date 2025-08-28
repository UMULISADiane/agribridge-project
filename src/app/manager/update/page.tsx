"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function UpdateUser() {
  const [form, setForm] = useState({
    username: "",
    password: "",
      confirmpassword: "",
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
    formData.append("confirmpassword", form.confirmpassword);
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
   <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <header className="bg-indigo-900 text-white py-6 shadow-lg w-full">
  <h1 className="text-3xl font-bold text-center">
    Agribridge User Management
  </h1>
</header>
<div className="p-8 max-w-6xl mx-auto">
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
          Add / Update User
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
         {/* Confirm password */}
<div>
  <label className="block font-medium">Confirm Password</label>
  <input
    type="password"
    name="confirmpassword"   // ✅ different name
    value={form.confirmpassword} // ✅ separate state property
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
            <label className="block font-medium">Telephone</label>
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
            <label className="block font-medium">Bank Account Number</label>
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
            Submit
          </button>
        </form>
      </div>
      </div>
       <footer className="w-full bg-indigo-900 text-white py-12 px-4 font-inter rounded-t-3xl mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-2">© 2026 Fleet Management System. All rights reserved.</p>
        <p className="font-bold text-green-700">
          Our mission is to optimize fleet operations and improve driver efficiency.
        </p>
      </div>
    </footer>
    </div>
  );
}
