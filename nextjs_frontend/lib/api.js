const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

export async function getBooks() {
  const body = JSON.stringify({
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

  console.log('API_URL:', API_URL)
  console.log('Sending body:', body)

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })

  const text = await res.text()
  console.log('Response status:', res.status)
  console.log('Response body:', text.slice(0, 500))

  const json = JSON.parse(text)

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch books')
  }

  return json.data.books.nodes
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
    variables: { slug }
  })

  console.log('getBookBySlug body:', body)

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })

  const text = await res.text()
  console.log('getBookBySlug response:', text.slice(0, 500))

  const json = JSON.parse(text)

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch book')
  }

  return json.data.bookBy
}