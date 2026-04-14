import { getPosts } from '@/lib/api'
import Link from 'next/link'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{new Date(post.date).toLocaleDateString('da-DK')}</p>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </article>
      ))}
    </main>
  )
}