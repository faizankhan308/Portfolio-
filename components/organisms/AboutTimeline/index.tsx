import SectionHeading from '@/components/molecules/SectionHeading'
import TimelineRow from '@/components/molecules/TimelineRow'

const TIMELINE = [
  {
    when: '2024 - PRESENT',
    title: 'AI Training / Coding Expert (Contract) · Outlier AI',
    body: 'Conducting LLM evaluation, prompt engineering, AI response analysis, response ranking, code evaluation, and AI output quality assessment for frontier coding models.',
  },
  {
    when: 'DEC 2025 - JUN 2026',
    title: 'Web Developer Intern · Donam Mart LLP',
    body: 'Contributed to the development and maintenance of responsive web applications, working with HTML, CSS, JavaScript, Bootstrap, PHP, and MySQL. Handled database integration, performance optimization, cross-browser testing, Git/GitHub, and deployment.',
  },
  {
    when: 'SEP 2024 - PRESENT',
    title: 'Freelance Full-Stack Developer & Software Engineering',
    body: 'Built SA Raichur Service Point, an Urban Company-inspired freelance full-stack client web application with Redux Toolkit cart management, JWT admin dashboard, and REST API backend. Developing modular React components, custom tools, and full-stack solutions.',
  },
  {
    when: '2024',
    title: 'SIH Zonalist & 200+ LeetCode DSA Solved',
    body: 'Competed in Smart India Hackathon 2024, ranking in the Top 33 out of 400 teams zonal-wide with an interactive water conservation game. Crossed 200+ Data Structures & Algorithms problems solved on LeetCode.',
  },
  {
    when: '2022 - 2026',
    title: 'B.Tech in CSE · Galgotias University',
    body: 'Pursing B.Tech in Computer Science and Engineering, achieving a CGPA of 8.46/10. Active participant in TechnoZAM coding club, Galgotias University Management Club, and campus volleyball/cricket teams.',
  },
  {
    when: '2020 - 2022',
    title: 'Class XII (Higher Secondary) · A T L School',
    body: 'Completed Higher Secondary Education in Senior Secondary subjects, securing an overall score of 83%.',
  },
  {
    when: '2020',
    title: 'Class X (Secondary) · Ishan Public School',
    body: 'Completed Secondary Education with an overall score of 74%.',
  },
]

const AboutTimeline = () => (
  <section className="py-16 border-t border-[var(--border)]">
    <SectionHeading num="03" label="HOW I GOT HERE" title="The short timeline" />
    <div>
      {TIMELINE.map((t) => (
        <TimelineRow key={t.when} {...t} />
      ))}
    </div>
  </section>
)

export default AboutTimeline
