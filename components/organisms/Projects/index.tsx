import Link from 'next/link'
import ProjectCard, { type ProjectData } from '@/components/organisms/ProjectCard'
import SectionHeading from '@/components/molecules/SectionHeading'
import Button from '@/components/atoms/Button'
import { getFeaturedProjects, type ProjectDetailResponse } from '@/services/projects'

function toProjectData(project: ProjectDetailResponse, index: number): ProjectData {
  const year = project.startedAt
    ? new Date(project.startedAt).getFullYear().toString()
    : new Date(project.createdAt).getFullYear().toString()

  const links: { label: string; href: string }[] = []
  if (project.liveUrl) links.push({ label: 'live demo', href: project.liveUrl })
  if (project.repoUrl) links.push({ label: 'github repo', href: project.repoUrl })

  return {
    num: String(index + 1).padStart(2, '0'),
    slug: project.slug,
    title: project.title,
    year,
    role: project.role ?? '',
    category: project.category,
    desc: project.shortDescription,
    keyFeatures: project.keyFeatures,
    imageUrl: project.images?.[0]?.url,
    tags: project.tags.map((t) => t.label),
    links,
    litTags: [0],
  }
}

const Projects = async () => {
  const featured = await getFeaturedProjects()

  const freelanceProjects = featured.filter((p) => p.category === 'freelance')
  const personalProjects = featured.filter((p) => p.category === 'personal')

  return (
    <section className="relative py-20" id="projects">
      <SectionHeading
        num="02"
        label="FEATURED WORK"
        title="Projects & Client Experience"
        aside={
          <>
            ~/projects/categories
            <br />
            <span style={{ color: 'var(--text-faint)' }}>{featured.length} published case studies</span>
          </>
        }
      />

      {/* FREELANCE PROJECTS SECTION */}
      <div className="mb-16">
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="font-[family-name:var(--font-mono)] text-[18px] text-[var(--text-bright)] font-semibold tracking-tight uppercase">
              Freelance Projects / Client Work
            </h3>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[12px] text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
            Real Client Business Experience
          </span>
        </div>

        <p className="text-[14.5px] text-[var(--text-dim)] mb-6 max-w-3xl leading-relaxed">
          Production full-stack applications built directly for client businesses, managing real-world client requirements, database architecture, payment/cart flows, and live deployments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelanceProjects.map((p, i) => (
            <ProjectCard key={p.id} project={toProjectData(p, i)} />
          ))}
        </div>
      </div>

      {/* PERSONAL PROJECTS SECTION */}
      <div className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <h3 className="font-[family-name:var(--font-mono)] text-[18px] text-[var(--text-bright)] font-semibold tracking-tight uppercase">
              Personal Technical Projects
            </h3>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--accent)] bg-[var(--accent-dim)] px-2.5 py-1 rounded border border-[var(--accent)]/20">
            Technical Exploration & AI Integration
          </span>
        </div>

        <p className="text-[14.5px] text-[var(--text-dim)] mb-6 max-w-3xl leading-relaxed">
          Technical engineering projects built to explore AI integration, complex state management, data visualization algorithms, and external API orchestration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {personalProjects.map((p, i) => (
            <ProjectCard key={p.id} project={toProjectData(p, i + freelanceProjects.length)} />
          ))}
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="mt-12 pt-7 border-t border-dashed border-[var(--border)] flex items-center justify-between gap-6 flex-wrap">
        <span className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--text-dim)]">
          <span className="text-[var(--text-faint)]">$ </span>ls -al /projects
          <span className="text-[var(--text-faint)] ml-3 text-[11.5px]">
            // 1 Freelance Client Project + 2 Personal AI Projects
          </span>
        </span>
        <Button as={Link} href="/projects">
          explore all case studies →
        </Button>
      </div>
    </section>
  )
}

export default Projects
