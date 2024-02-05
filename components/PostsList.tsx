import db from '@/modules/db'
import Button from './Button'
import { revalidatePath } from 'next/cache'

export default async function PostsList() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const posts = await db.post.findMany({ orderBy: { createdAt: 'desc' } })

  const removePost = async (data: FormData) => {
    'use server'
    await db.post.delete({ where: { id: data.get('id') as string } })
    revalidatePath('/')
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="flex gap-2">
          <div>{post.content}</div>

          <form action={removePost}>
            <input type="hidden" name="id" value={post.id} />
            <Button className="text-red-500 disabled:text-red-300 transition">
              [x] remove
            </Button>
          </form>
        </div>
      ))}
    </>
  )
}
