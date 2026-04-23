function getCookie(name) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
}

export async function login(email, password) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
        method: "GET",
    });

    const xsrfToken = decodeURIComponent(getCookie("XSRF-TOKEN"));

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        credentials: "include",
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": xsrfToken,
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json();
}
