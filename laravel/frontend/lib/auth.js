export async function login(email, password) {

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
        method: "GET",
    });

    // STEP 2: login
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json();
}
