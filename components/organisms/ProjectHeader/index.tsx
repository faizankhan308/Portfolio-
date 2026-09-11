import Image from 'next/image'
import Tag from '@/components/atoms/Tag'
import Button from '@/components/atoms/Button'
import { formatProjectDate, type ProjectDetailResponse } from '@/services/projects'

const ProjectHeader = ({ project }: { project: ProjectDetailResponse }) => {
  const start = formatProjectDate(project.startedAt)
  const end = project.endedAt ? formatProjectDate(project.endedAt) : 'ongoing'
  const dateRange = start ? `${start} – ${end}` : null
  const isFreelance = project.category === 'freelance'
  const heroImage = project.images?.[0]?.url

  return (
    <header className="pb-10 mb-12 border-b border-[var(--border)]">
      {/* Category & Tags Header */}
      <div className="flex gap-2 flex-wrap items-center mb-5">
        <span
          className={`px-3 py-1 rounded text-[11px] font-[family-name:var(--font-mono)] font-semibold tracking-wider uppercase ${
            isFreelance
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent)]/20'
          }`}
        >
          {isFreelance ? 'Freelance Client Project' : 'Personal Technical Project'}
        </span>
        {project.tags.map((t, i) => (
          <Tag key={t.id} label={`#${t.label}`} highlighted={i === 0} />
        ))}
      </div>

      {/* Main Title */}
      <h1 className="font-[family-name:var(--font-mono)] font-medium text-[clamp(32px,4.6vw,52px)] leading-[1.08] tracking-[-0.035em] text-[var(--text-bright)] m-0 mb-4 text-balance">
        {project.title}
      </h1>

      {/* Subtitle / Tagline */}
      {project.tagline && (
        <p className="font-[family-name:var(--font-mono)] text-[16px] text-[var(--text-dim)] m-0 mb-6 max-w-2xl leading-relaxed">
          {project.tagline}
        </p>
      )}

      {/* Meta Bar & CTA Buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-dashed border-[var(--border)] mb-8">
        <div className="flex gap-3 flex-wrap items-center font-[family-name:var(--font-mono)] text-[13px] text-[var(--text-dim)]">
          {project.role && <span className="font-medium text-[var(--text-bright)]">{project.role}</span>}
          {project.role && dateRange && <span className="text-[var(--text-faint)]">·</span>}
          {dateRange && <span>{dateRange}</span>}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {project.liveUrl && (
            <Button
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="text-[13px] px-4 py-2"
            >
              ↗ Live Demo
            </Button>
          )}
          {project.repoUrl && (
            <Button
              as="a"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="default"
              className="text-[13px] px-4 py-2"
            >
              ↗ GitHub Repository
            </Button>
          )}
        </div>
      </div>

      {/* Hero Screenshot Window Container */}
      {heroImage && (
        <div className="relative rounded-xl border border-[var(--border)] bg-[var(--surface-2)] overflow-hidden shadow-[var(--shadow-card)] my-6">
          {/* Top Browser Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)] font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="truncate max-w-md px-3 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[11px] text-[var(--text-faint)]">
              {project.liveUrl || `https://fk.dev/project/${project.slug}`}
            </div>
            <div className="text-[11px] text-[var(--accent)] font-mono">case_study.png</div>
          </div>

          {/* Hero Screenshot */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black/40">
            <Image
              src={heroImage}
              alt={`${project.title} main screenshot`}
              fill
              priority
              sizes="(max-width: 1040px) 100vw, 800px"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default ProjectHeader
