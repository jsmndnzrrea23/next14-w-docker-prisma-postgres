import db from '@/modules/db'

export default async function PostsList() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const posts = await db.post.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </>
  )
}
