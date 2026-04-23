"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getCookie(name) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
}

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // 1. CSRF cookie (Sanctum kræver dette)
            await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const xsrfToken = decodeURIComponent(getCookie("XSRF-TOKEN"));

            // 2. Register request
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-XSRF-TOKEN": xsrfToken,
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        password_confirmation: password,
                    }),
                }
            );

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(data?.message || "Register failed");
            }

            console.log("User created:", data);

            // 3. Redirect efter succes
            router.push("/login");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page-layout">
            <div className="login-container">
                <h1 className="hero-title">Register</h1>
                <h2 className="hero-subtitle">
                    Opret en ny bruger
                </h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Navn:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="hero-cta" type="submit">
                        Opret bruger
                    </button>

                    {error && (
                        <p style={{ color: "red" }}>{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
