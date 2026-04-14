import { getPostBySlug } from '@/lib/api'

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{new Date(post.date).toLocaleDateString('da-DK')}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}