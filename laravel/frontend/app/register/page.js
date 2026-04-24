"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getCookie(name) { //document.cookie giver mig alle cookies i en string
    return document.cookie
     .split("; ") //deler op i stringen ved "; " så jeg får en array med hver cookie som et element
        .find((row) => row.startsWith(name + "=")) //finder den cookie jeg æger efter
        ?.split("=")[1]; //deler den cookie op ved "=" og tager det sidste element som er værdien af cookien
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
            // 1. CSRF cookie (Sanctum kræver dette) CSRF ER CROSS-SITE REUEST
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
        <div className="login-page-layout hero">
            <div className="login-container">
                <h1 className="page-title white">Register</h1>
                <h2 className="page-sub white">
                    Opret en ny bruger
                </h2>

                <form className="form-field" onSubmit={handleSubmit}>
                    <label className="form-label blue">Navn:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                    />

                    <label className="form-label blue">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />

                    <label className="form-label blue">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                    <div className="login-buttons">
                    <button className="hero-cta" type="submit">
                        Register
                    </button>
                    <button className="hero-cta " onClick={() => router.push("/login")} type="button">
                        Tilbage til login
                    </button>
                    </div>


                    {error && (
                        <p style={{ color: "red" }}>{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
