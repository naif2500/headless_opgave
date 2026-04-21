// lib/api.js

export async function getBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        method: "GET",
    });

    const json = await res.json();

    return json;
}

export async function getBookBySlug(slug) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${slug}`,
        {
            method: "GET",
        },
    );

    const json = await res.json();

    return json;
}
