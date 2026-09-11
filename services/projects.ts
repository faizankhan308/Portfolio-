import { PROJECTS, type ProjectData } from '@/lib/data/projects'

export type ProjectDetailResponse = ProjectData
export type ProjectListResponse = { items: ProjectData[]; total: number }

export async function getProjects(): Promise<ProjectDetailResponse[]> {
  return PROJECTS.filter((p) => p.published)
}

export async function getProject(slug: string): Promise<ProjectDetailResponse | null> {
  const found = PROJECTS.find((p) => p.slug === slug && p.published)
  return found ?? null
}

export async function getFeaturedProjects(): Promise<ProjectDetailResponse[]> {
  return PROJECTS.filter((p) => p.featured && p.published).sort(
    (a, b) => a.displayOrder - b.displayOrder
  )
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return PROJECTS.filter((p) => p.published).map((p) => p.slug)
}

export function getAllProjectTags(projects: ProjectDetailResponse[]): [string, number][] {
  const counts = new Map<string, number>()
  for (const p of projects) {
    for (const t of p.tags) {
      counts.set(t.label, (counts.get(t.label) ?? 0) + 1)
    }
  }
  return [
    ['all', projects.length] as [string, number],
    ...Array.from(counts.entries()).sort((a, b) => b[1] - a[1]),
  ]
}

export function formatProjectDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric' })
}
