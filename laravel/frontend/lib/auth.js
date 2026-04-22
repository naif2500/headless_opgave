export async function loginUser(email, password) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }
    );

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}
