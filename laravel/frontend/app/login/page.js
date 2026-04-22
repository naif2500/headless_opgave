"use client";

import { useState } from "react";
import{ useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);

            console.log("login virker", data, data.token);
            MessageEvent("Du er logget ind", data);

            // gemmer  token
            localStorage.setItem("token", data.token);
router.push("/books");
 } catch (err) {
            setError("Forkert login");
        }
    };

    return (
       < div className="login-page-layout">
        <div className="login-container">
            <h1 className="hero-title">Login</h1>
            <h2 className="hero-subtitle">Indtast dine oplysninger for at logge ind</h2>

            <form className="login-form" onSubmit={handleSubmit}>
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

                <button className="hero-cta" type="submit">Login</button>
            </form>

        </div>
        if(token)
        </div>
    );
}
