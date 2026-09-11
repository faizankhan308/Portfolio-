import { POSTS, type PostData } from '@/lib/data/posts'

export type PostDetailResponse = PostData
export type PostListItemResponse = PostData

export async function getPosts(): Promise<PostListItemResponse[]> {
  return POSTS
}

export async function getPost(slug: string): Promise<PostDetailResponse | null> {
  const found = POSTS.find((p) => p.slug === slug)
  return found ?? null
}

export async function getAllSlugs(): Promise<string[]> {
  return POSTS.map((p) => p.slug)
}

export function getAllTags(posts: PostListItemResponse[]): [string, number][] {
  const counts = new Map<string, number>()
  for (const p of posts) {
    for (const t of p.tags) {
      counts.set(t.label, (counts.get(t.label) ?? 0) + 1)
    }
  }
  return [
    ['all', posts.length] as [string, number],
    ...Array.from(counts.entries()).sort((a, b) => b[1] - a[1]),
  ]
}

export function formatDate(iso: string): { day: string; month: string; year: number } {
  const d = new Date(iso)
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  return { day: String(d.getDate()).padStart(2, '0'), month, year: d.getFullYear() }
}
