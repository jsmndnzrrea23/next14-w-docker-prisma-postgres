import db from '@/modules/db'
import { faker } from '@faker-js/faker'
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={generatePosts}>
        <input type="text" name="content" placeholder="content" required />
        <Button className="bg-zinc-900 disabled:bg-zinc-500 text-white transition">
          Generate Posts
        </Button>
      </form>

      <h1>All Posts</h1>

      <Suspense fallback="Loading...">
        <PostsList />
      </Suspense>
    </main>
  )
}
