import SectionHeading from '@/components/molecules/SectionHeading'
import NowCard from '@/components/molecules/NowCard'

const CURRENTLY = [
  {
    verb: 'EVALUATING AI',
    what: 'Outlier AI',
    detail: 'Contractual AI Training & Coding Expert evaluating LLM code output quality, response ranking, and prompt engineering.',
  },
  {
    verb: 'BUILDING',
    what: 'SA Raichur Service Point',
    detail: 'A full-stack freelance service marketplace web application built with React, Redux Toolkit, Express, and MongoDB.',
  },
  {
    verb: 'LEARNING',
    what: 'AWS Cloud & Backend',
    detail: 'Learning cloud fundamentals, containerized deployments, AWS services, and scalable full-stack web architecture.',
  },
]

const AboutCurrently = () => (
  <section className="py-16 border-t border-[var(--border)]">
    <SectionHeading num="05" label="RIGHT NOW" title="Currently" />
    <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">
      {CURRENTLY.map((c) => (
        <NowCard key={c.verb} {...c} />
      ))}
    </div>
  </section>
)

export default AboutCurrently
