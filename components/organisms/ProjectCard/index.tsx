import Link from 'next/link'
import Image from 'next/image'
import Tag from '@/components/atoms/Tag'
import Button from '@/components/atoms/Button'

export interface ProjectData {
  num: string
  slug: string
  title: string
  year: string
  role: string
  category: 'personal' | 'freelance'
  desc: string
  keyFeatures?: string[]
  imageUrl?: string
  tags: string[]
  links: { label: string; href: string }[]
  litTags: number[]
}

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const isFreelance = project.category === 'freelance'

  return (
    <article className="group relative flex flex-col border border-[var(--border)] rounded-xl bg-[var(--surface)] overflow-hidden cursor-pointer transition-all duration-200 hover:border-[var(--accent)] hover:-translate-y-1 shadow-[var(--shadow-card)]">
      <Link
        href={`/project/${project.slug}`}
        className="absolute inset-0 z-0"
        aria-label={project.title}
      />

      {/* Thumbnail Cover Image */}
      {project.imageUrl && (
        <div className="relative w-full aspect-[16/9] bg-[var(--surface-2)] border-b border-[var(--border)] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Card Header Tag & Category */}
        <div className="flex items-center justify-between gap-2 mb-2 font-[family-name:var(--font-mono)] text-[11px]">
          <span className="text-[var(--accent)] tracking-[0.08em]">[{project.num}]</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ${
              isFreelance
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent)]/20'
            }`}
          >
            {isFreelance ? 'Freelance Client Project' : 'Personal Project'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-mono)] text-[20px] tracking-[-0.02em] text-[var(--text-bright)] mb-1 font-medium group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>

        {/* Meta info */}
        <div className="font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--text-dim)] mb-3 flex items-center gap-2">
          <span>{project.year}</span>
          <span className="text-[var(--text-faint)]">·</span>
          <span>{project.role}</span>
        </div>

        {/* Description */}
        <p className="text-[13.5px] text-[var(--text)] leading-[1.55] mb-4 text-pretty line-clamp-3">
          {project.desc}
        </p>

        {/* Key Functionality Bullets */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="mb-4 pt-3 border-t border-dashed border-[var(--border)]">
            <span className="block font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
              Key Highlights:
            </span>
            <ul className="space-y-1">
              {project.keyFeatures.slice(0, 2).map((feat, idx) => (
                <li
                  key={idx}
                  className="text-[12.5px] text-[var(--text-dim)] flex items-start gap-1.5 leading-snug"
                >
                  <span className="text-[var(--accent)] shrink-0 mt-0.5">›</span>
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
          {project.tags.map((t, i) => (
            <Tag key={t} label={t} highlighted={project.litTags.includes(i)} />
          ))}
        </div>

        {/* Links Footer */}
        <div className="flex gap-3 pt-3 border-t border-dashed border-[var(--border)] relative z-10">
          {project.links.map((l) => (
            <Button
              key={l.label}
              as={Link}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="plain"
              className="text-[12px] py-1"
            >
              ↗ {l.label}
            </Button>
          ))}
          <Button
            as={Link}
            href={`/project/${project.slug}`}
            variant="ghost"
            className="ml-auto text-[12px] py-1 text-[var(--accent)]"
          >
            Case Study →
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
