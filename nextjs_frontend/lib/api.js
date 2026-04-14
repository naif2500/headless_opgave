const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

export async function getPosts() {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetPosts {
          posts {
            nodes {
              id
              title
              slug
              date
              excerpt
              content
            }
          }
        }
      `
    })
  })

  const json = await res.json()
  return json.data.posts.nodes
}

export async function getPostBySlug(slug) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetPost($slug: String!) {
          postBy(slug: $slug) {
            id
            title
            date
            content
          }
        }
      `,
      variables: { slug }
    })
  })

  const json = await res.json()
  return json.data.postBy
}