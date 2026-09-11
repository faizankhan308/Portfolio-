import SectionHeading from '@/components/molecules/SectionHeading'
import Tag from '@/components/atoms/Tag'

const SKILL_GROUPS = [
  {
    category: 'AI / LLM Evaluation',
    skills: [
      'LLM Evaluation',
      'Prompt Engineering',
      'AI Response Analysis',
      'Response Ranking',
      'Code Evaluation',
      'AI Output Quality Assessment',
    ],
  },
  {
    category: 'Languages',
    skills: ['JavaScript (ES6+)', 'Java', 'Python', 'SQL', 'HTML5/CSS3'],
  },
  {
    category: 'Frontend Development',
    skills: [
      'React.js',
      'Tailwind CSS',
      'Bootstrap',
      'Context API',
      'Responsive Web Design',
      'Redux Toolkit',
    ],
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
  },
  {
    category: 'Databases & ORM',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Prisma ORM'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git/GitHub', 'VS Code', 'Postman', 'Docker', 'Vite', 'Jest', 'GitHub Actions'],
  },
]

const AboutSkills = () => (
  <section className="py-16 border-t border-[var(--border)]" id="skills">
    <SectionHeading num="04" label="STACK & EXPERTISE" title="Technical Skills" />
    <div className="grid grid-cols-2 gap-6 max-[760px]:grid-cols-1">
      {SKILL_GROUPS.map(({ category, skills }) => (
        <div
          key={category}
          className="border border-[var(--border)] bg-[var(--surface)] p-5 rounded-xl shadow-[var(--shadow-card)] flex flex-col gap-3"
        >
          <h3 className="font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[var(--accent)] tracking-[0.04em] uppercase">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default AboutSkills
