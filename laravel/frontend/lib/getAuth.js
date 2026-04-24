export function getAuth() {
    if (typeof window === "undefined") return false;

    const cookies = document.cookie.split("; "); //splitter min cokkies op i et array
    const sessionCookie = cookies.find(
        (row) =>
            row.startsWith("laravel_session=") || row.startsWith("XSRF-TOKEN="),
    );

    return !!sessionCookie;
}

// export function getAuth() {
//     if (typeof window === "undefined") return false;

//     const token = localStorage.getItem("token");

//     return !!token;
// }
