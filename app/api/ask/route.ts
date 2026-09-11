import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { streamText } from 'ai'

export const SYSTEM_PROMPT = `You are a friendly AI assistant on Faizan Khan's portfolio website. Answer visitor questions about Faizan, his work, skills, education, experience, and projects.

# About Faizan
- Name: Faizan Khan (brand name: FK.DEV)
- Role: Full-Stack Developer, Software Engineer, AI Training Expert
- Location: Delhi, India (GMT+5:30)
- Experience:
  1. AI Training / Coding Expert (Contract) at Outlier AI (2024 - Present): LLM evaluation, prompt engineering, AI response ranking, code evaluation, and output quality assessment.
  2. Web Developer Intern at Donam Mart LLP (Dec 2025 - Jun 2026): HTML, CSS, JavaScript, Bootstrap, PHP, MySQL, database integration, cross-browser testing, deployment.
  3. Freelance Full-Stack Developer: Built SA Raichur Service Point client application.
- Status: Seeking opportunities as a Software Engineer, Full-Stack Developer, or Frontend Developer

# Core Skills & Technical Profile
- Languages: JavaScript (ES6+), Java, Python, SQL, HTML5, CSS3
- Frontend: React.js, Tailwind CSS, Bootstrap, Context API, Redux Toolkit, Responsive Web Design
- Backend: Node.js, Express.js, REST APIs, JWT Authentication
- Databases & ORM: MongoDB, MySQL, PostgreSQL, Prisma ORM
- AI / LLM Evaluation: LLM Evaluation, Prompt Engineering, AI Response Analysis, Response Ranking, Code Evaluation, AI Output Quality Assessment
- Fundamentals: Data Structures & Algorithms (200+ LeetCode problems solved), Object Oriented Programming, Computer Networks, Operating Systems, DBMS
- Tools & DevOps: Git, GitHub, VS Code, Postman, Docker, Vite, Jest, GitHub Actions

# Key Projects
When mentioning a project, always add: "for more info visit project page /projects"
- SA Raichur Service Point: Freelance client service marketplace web application inspired by Urban Company. React, Redux Toolkit, Express, MongoDB, JWT Admin panel.
- AI Finance Platform: Personal project — AI-powered finance management platform for tracking expenses, budget forecasting, and data visualization. React, Node, Express, MongoDB, REST API.
- Imagify – Text to Image Generator: Personal project — AI creative tool that converts prompts into visual art using OpenAI's DALL-E API. React, OpenAI API, Express.js, Tailwind CSS.

# Background & Education
- B.Tech in Computer Science and Engineering at Galgotias University (2022 - 2026) with a CGPA of 8.46/10.
- Class XII (Higher Secondary Education) at A T L School (2020 - 2022) with 83%.
- Class X (Secondary Education) at Ishan Public School (2020) with 74%.
- Achievement: Smart India Hackathon 2024 Zonalist — Top 33 rank out of 400 teams with an interactive water conservation game.
- Milestone: 200+ Data Structures & Algorithms problems solved on LeetCode.

# Contact & Links
- Email: khanfaizan68397@gmail.com
- Phone: +91 8874917623
- GitHub: https://github.com/faizankhan308
- LinkedIn: https://linkedin.com/in/faizan-khan308/
- Unknown info: "I don't have that exact detail, but you can reach Faizan directly at khanfaizan68397@gmail.com or +91 8874917623."

# Response rules
- Under 150 words unless asked for detail
- Plain prose, minimal markdown
- Refer to Faizan in third person using he/him
- Off-topic questions: "I'm here to answer questions about Faizan's work, experience, and projects. Anything specific you'd like to know?"
`

function getSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase()

  if (q.includes('raichur') || q.includes('freelance') || q.includes('service point') || q.includes('client')) {
    return "Faizan built 'SA Raichur Service Point' as a full-stack freelance client project for a home services business in Raichur, Karnataka. Inspired by Urban Company, it features a React + Redux Toolkit cart system, Node/Express REST API, MongoDB database, Nodemailer booking alerts, and a JWT-protected admin dashboard. You can explore the full case study on the /projects page!"
  }

  if (q.includes('finance') || q.includes('welth') || q.includes('budget')) {
    return "'AI Finance Platform' (Welth) is a personal technical project built by Faizan using React, Node.js, Express, and MongoDB. It uses intelligent prediction models to track expenses, analyze spending trends, and recommend monthly budget limits with interactive charts. Check it out on the /projects page!"
  }

  if (q.includes('imagify') || q.includes('image') || q.includes('dall') || q.includes('prompt')) {
    return "'Imagify – Text to Image Generator' is a personal project where Faizan integrated the OpenAI DALL·E API with a React frontend and Express backend. It converts plain text prompts into visual art with server-side API key protection and prompt history gallery."
  }

  if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('portfolio')) {
    return "Faizan's work is organized into two distinct categories: Freelance Work (SA Raichur Service Point client project) and Personal Technical Projects (AI Finance Platform and Imagify Text-to-Image Generator). You can view detailed case studies for all of them on the /projects page!"
  }

  if (q.includes('outlier') || q.includes('llm') || q.includes('eval') || q.includes('prompt engineering')) {
    return "At Outlier AI, Faizan works as an AI Training & Coding Expert (Contract). He performs LLM evaluation, prompt engineering, AI code evaluation, response ranking, and output quality assessment for frontier AI models."
  }

  if (q.includes('donam') || q.includes('intern')) {
    return "Faizan worked as a Web Developer Intern at Donam Mart LLP (Dec 2025 – Jun 2026), where he built responsive web pages, handled PHP and MySQL backend integration, performed cross-browser testing, and optimized UI performance."
  }

  if (q.includes('experience') || q.includes('background') || q.includes('bio') || q.includes('about')) {
    return "Faizan Khan is a Computer Science Engineer (B.Tech at Galgotias University, CGPA 8.46) specializing in Full-Stack Development and AI/LLM evaluation. His experience spans working as an AI Training Expert at Outlier AI, Web Developer Intern at Donam Mart LLP, and building production freelance and personal projects."
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('tech') || q.includes('language')) {
    return "Faizan's core stack includes React.js, Next.js, Node.js, Express, JavaScript (ES6+), Java, Python, MongoDB, MySQL, PostgreSQL, Prisma, Redux Toolkit, and Tailwind CSS. He has also solved 200+ DSA problems on LeetCode and was a Smart India Hackathon 2024 Zonalist!"
  }

  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('cgpa') || q.includes('gpa')) {
    return "Faizan is pursuing his B.Tech in Computer Science and Engineering at Galgotias University (2022–2026) with a CGPA of 8.46/10. He completed Class XII at A T L School (83%) and Class X at Ishan Public School (74%)."
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('available') || q.includes('job')) {
    return "Faizan is available and seeking full-time Software Engineer / Full-Stack Developer roles! You can contact him via email at khanfaizan68397@gmail.com, phone at +91 8874917623, GitHub (faizankhan308), or LinkedIn."
  }

  return "Hi! I'm Faizan Khan's portfolio AI assistant. I can answer questions about his Full-Stack engineering experience, Outlier AI role, Donam Mart LLP internship, freelance client project (SA Raichur Service Point), personal AI projects (AI Finance Platform, Imagify), skills, or contact info. What would you like to know?"
}

function createTextStreamResponse(text: string): Response {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(' ')
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i]
        controller.enqueue(encoder.encode(chunk))
        await new Promise((res) => setTimeout(res, 20))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const rawMessages = body.messages || []

    const messagesForModel = rawMessages.map(
      (m: { role: string; content?: string; parts?: { text: string }[] }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content || m.parts?.map((p) => p.text).join('') || '',
      }),
    )

    const validMessages = messagesForModel.filter(
      (m: { role: string; content: string }) => m.content.trim().length > 0,
    )

    if (validMessages.length === 0) {
      return createTextStreamResponse(getSmartFallbackResponse(''))
    }

    const lastUserMessage = [...validMessages].reverse().find((m: { role: string }) => m.role === 'user')?.content || ''

    const baseUrl = process.env.LLAMA_BASE_URL
    if (baseUrl && baseUrl !== 'http://192.168.1.115:8080/v1') {
      try {
        const checkRes = await fetch(`${baseUrl}/models`, {
          signal: AbortSignal.timeout(1200),
        })
        if (checkRes.ok) {
          const llama = createOpenAICompatible({
            name: 'llama',
            baseURL: baseUrl,
            apiKey: process.env.LLAMA_API_KEY ?? 'not-needed',
          })
          const modelName = process.env.LLM_MODEL ?? 'gemma-4-E2B-it-Q5_K_M.gguf'

          const result = streamText({
            model: llama(modelName) as unknown as Parameters<typeof streamText>[0]['model'],
            system: SYSTEM_PROMPT,
            messages: validMessages,
            maxOutputTokens: 250,
            abortSignal: AbortSignal.timeout(10_000),
          })

          return result.toTextStreamResponse()
        }
      } catch {
        // Fall back to knowledge engine stream
      }
    }

    return createTextStreamResponse(getSmartFallbackResponse(lastUserMessage))
  } catch (err) {
    console.error('[api/ask] error:', err)
    return createTextStreamResponse(getSmartFallbackResponse(''))
  }
}
