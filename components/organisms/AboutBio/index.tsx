import SectionHeading from '@/components/molecules/SectionHeading'

const AboutBio = () => (
  <section className="py-16 border-t border-[var(--border)]">
    <SectionHeading num="01" label="THE LONGER VERSION" title="A bit about me" />
    <div className="columns-2 gap-10 max-[760px]:columns-1">
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mt-0 mb-[1.1em] text-wrap-pretty break-inside-avoid first-letter:text-[var(--accent)] first-letter:font-[family-name:var(--font-mono)] first-letter:text-[2em] first-letter:font-semibold first-letter:float-left first-letter:leading-[0.8] first-letter:mr-1 first-letter:mt-1">
        I&apos;m Faizan Khan, a Computer Science undergraduate at Galgotias University (CGPA 8.46/10) specializing in Software Engineering, Full-Stack Development, and AI Model Evaluation. I turn complex logic into responsive, high-performance web applications. My core stack spans JavaScript, Java, Python, React.js, Node.js, Express, MongoDB, MySQL, PostgreSQL, Prisma, and Data Structures &amp; Algorithms.
      </p>
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mt-0 mb-[1.1em] text-wrap-pretty break-inside-avoid">
        As an AI Training &amp; Coding Expert at Outlier AI, I perform LLM evaluation, prompt engineering, AI response ranking, code evaluation, and output quality assessment. In my software roles, I built production web applications during my Web Developer Internship at Donam Mart LLP, alongside developing full-stack freelance client projects like <em>SA Raichur Service Point</em>.
      </p>
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mt-0 mb-[1.1em] text-wrap-pretty break-inside-avoid">
        Problem-solving is at the heart of my engineering practice. I have solved <strong>200+ DSA problems on LeetCode</strong> and competed in the <strong>Smart India Hackathon 2024</strong>, where our team developed an interactive water conservation game that ranked in the <strong>Top 33 out of 400 teams</strong> at the zonal level.
      </p>
      <p className="text-[15px] leading-[1.7] text-[var(--text)] mt-0 mb-0 text-wrap-pretty break-inside-avoid">
        When I&apos;m off the clock, I stay active on campus playing Cricket and Volleyball, exploring emerging cloud tech (AWS), or reading software architecture documentation.
      </p>
    </div>
  </section>
)

export default AboutBio
