// lib/api.js

export async function getBooks() {
    const res = await fetch(`${process.env.BASE_URL}/api/books`, {
        method: "GET",
    });

    const json = await res.json();

    console.log("json", json);

    return json;
}

export async function getBookBySlug(slug) {
    const body = JSON.stringify({
        query: `
      query GetBook($slug: String!) {
        bookBy(slug: $slug) {
          id
          title
          slug
          price
          authorName
          publishingDate
          excerpt
          description
          genre
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    `,
        variables: { slug },
    });

    console.log("getBookBySlug body:", body);

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
    });

    const text = await res.text();
    console.log("getBookBySlug response:", text.slice(0, 500));

    const json = JSON.parse(text);

    if (json.errors) {
        console.error(json.errors);
        throw new Error("Failed to fetch book");
    }

    return json.data.bookBy;
}
