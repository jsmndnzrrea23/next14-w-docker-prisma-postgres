import db from '@/modules/db'
import { revalidatePath } from 'next/cache'
import Button from '@/components/Button'
import PostsList from '@/components/PostsList'
import { Suspense } from 'react'

export default async function Home() {
  const generatePosts = async (data: FormData) => {
    'use server'

    const content = data.get('content')

    await db.post.create({
      data: { content: content as string },
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    revalidatePath('/')
  }

  return (
    <main className="p-4 flex flex-col">
      <form className="flex gap-2" action={generatePosts}>
        <input
          className="border-2 border-slate-300 rounded-md p-2"
          type="text"
          name="content"
          placeholder="content"
          required
        />
        <Button className="bg-zinc-900 disabled:bg-zinc-500 text-white transition p-2 rounded-md">
          Submit
        </Button>
      </form>

      <h1 className="text-lg font-semibold">All Posts</h1>

      <Suspense fallback="Loading...">
        <PostsList />
      </Suspense>
    </main>
  )
}
