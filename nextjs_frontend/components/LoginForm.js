"use client";

import { useState } from "react";
// Remove useRouter since we are doing a hard reload
import { loginUser } from "../lib/api"; 

export default function LoginForm() {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await loginUser(
        e.target.username.value,
        e.target.password.value,
      );

      if (!token) throw new Error("No token received");

      const cookieRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (cookieRes.ok) {
        alert("Velkommen!");
        // RELOAD THE PAGE
        window.location.href = "/profile"; 
      } else {
        throw new Error("Failed to set auth cookie");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // ... (Rest of your return statement remains the same)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input name="username" placeholder="Username" className="border p-2 w-full" required />
      <input name="password" type="password" placeholder="Password" className="border p-2 w-full" required />
      <button className="bg-blue-600 text-white p-2 w-full">Log ind</button>
    </form>
  );
}