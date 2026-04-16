const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

export async function getBooks() {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetBooks {
          books {
            nodes {
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
        }
      `
    })
  })

  const json = await res.json()
  
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data.books.nodes
}