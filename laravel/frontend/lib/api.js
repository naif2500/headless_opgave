// lib/api.js

export async function getBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        method: "GET",
    });

    if (res.status !== 200) {
        throw new Error("Failed loading the books.");
    }

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

    if (res.status !== 200) {
        throw new Error("Failed loading the book.");
    }

    const json = await res.json();

    return json;
}
