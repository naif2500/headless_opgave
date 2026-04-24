"use client";
import { useState } from "react";
import{ useRouter } from "next/navigation";
import { login } from "@/lib/auth.js";
import Image from "next/image";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log("login virker", data, data.token);
console.log("Du er logget ind", data);
            // gemmer  token
            localStorage.setItem("token", data.token);
            console.log("Token gemt i localStorage:", data.token);
router.push("/books");
 } catch (err) {
            setError("Forkert login");
        }
    };
    return (
       < div className="login-page-layout hero  ">

        <div className="login-container">
            <h1 className="page-title white ">Login</h1>
            {/* <h2 className="page-sub white ">Indtast dine oplysninger for at logge ind</h2> */}
            <form method="post" className="form-field" onSubmit={handleSubmit}>
                <label  className="form-label blue">Email:</label>
                <input className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required

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
                    <button className="hero-cta" type="submit">Login</button>
                <button className="hero-cta" onClick={() => router.push("/register")} type="button">Opret bruger</button>
                </div>

            </form>
        </div>
         <div className="background-image-div">

<Image
  src="/img/bg-sign-up.png"
  alt="Signup background"
  className="image-login"
  width={300}
  height={300}
/>
     </div>
        </div>
    );
}
