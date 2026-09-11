import { TAGS, type ProjectTag } from './projects'

export interface PostData {
  id: string
  slug: string
  title: string
  excerpt: string
  contentMd: string
  coverImage: string | null
  readingMinutes: number
  publishedAt: string
  createdAt: string
  updatedAt: string
  tags: ProjectTag[]
}

export const POSTS: PostData[] = [
  {
    id: 'post-1',
    slug: 'building-an-ai-powered-finance-platform',
    title: 'Building an AI-Powered Finance Platform',
    excerpt: 'A deep dive into how I built a finance management system with expense tracking, budget predictions, and interactive visualization using React, Node.js, and MongoDB.',
    contentMd: `## Introduction\n\nManaging personal finances can be challenging. To make the process easier and smarter, I built the AI Finance Platform, an application that tracks expenses, forecasts budgets, and visualizes financial data.\n\n## Tech Stack & Architecture\n\nThe application is built using the following stack:\n- **Frontend**: React.js with interactive chart visualizations.\n- **Backend**: Node.js and Express.js RESTful API.\n- **Database**: MongoDB for secure, flexible storage of users, transactions, and budgets.\n- **AI/ML Integration**: Prediction models to analyze spending habits and output budget suggestions.\n\n## Core Features\n\n- **Interactive Dashboard**: Users get a real-time overview of their income and spending habits.\n- **Expense Forecasting**: AI-based budget recommendations that adapt to historical transaction patterns.\n- **Secure Authentication**: Ensuring user data privacy and security.\n- **RESTful API**: Clean API communication layer enabling smooth database integrations.`,
    coverImage: null,
    readingMinutes: 3,
    publishedAt: '2025-02-15T00:00:00.000Z',
    createdAt: '2025-02-15T00:00:00.000Z',
    updatedAt: '2025-02-15T00:00:00.000Z',
    tags: [TAGS.react, TAGS.node, TAGS.express, TAGS.mongodb],
  },
  {
    id: 'post-2',
    slug: 'my-experience-at-smart-india-hackathon',
    title: 'My Experience at Smart India Hackathon',
    excerpt: 'How my team developed an interactive water conservation game for SIH 2024 and achieved a Top 33 rank out of 400 teams.',
    contentMd: `## The Challenge: Water Conservation\n\nAt the Smart India Hackathon (SIH) 2024, our team chose to address the pressing issue of water conservation. We wanted to design a solution that would educate users on rainwater harvesting and conservation techniques in a highly engaging way.\n\n## Our Solution: An Interactive Educational Game\n\nWe developed an interactive multi-level game focused on water preservation:\n- **Level-Based Gameplay**: Players solve challenges related to rainwater harvesting and conservation.\n- **Knowledge Unlocks**: Completing each level unlocks practical resources and access to real-world water-conservation techniques.\n- **Engaging UI**: Interactive elements that translate complex environmental concepts into accessible gameplay.\n\n## Key Achievements\n\nOur solution was presented at the zonal level, where we competed against high-caliber projects from across the country. Our team successfully secured a **Top 33 rank out of 400 teams** at the zonal competition.`,
    coverImage: null,
    readingMinutes: 3,
    publishedAt: '2024-12-20T00:00:00.000Z',
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
    tags: [TAGS.javascript, TAGS.react],
  },
  {
    id: 'post-3',
    slug: 'beyond-the-classroom-my-academic-and-sports-journey',
    title: 'Beyond the Classroom: My Academic and Sports Journey',
    excerpt: 'Reflecting on my B.Tech studies at Galgotias University, campus clubs, achievements, and balancing academics with sports.',
    contentMd: `## Academics at Galgotias University\n\nPursuing a Bachelor of Technology in Computer Science and Engineering at Galgotias University has helped me build a strong foundation in core computer science subjects. Maintaining a **GPA of 8.46/10** while balancing coding projects and extracurriculars has been a key focus of my academic life.\n\n## Tech Clubs & Campus Leadership\n\nActive participation in student organizations has allowed me to grow as a developer and collaborator:\n- **TechnoZAM**: Being part of the university's technical/coding club has provided opportunities to solve complex coding challenges and share technical knowledge.\n- **Galgotias University Management Club**: Developing administrative and project organization skills.\n\n## Hackathons & Beyond\n\nOne of the highlights of my university journey was competing in the **Smart India Hackathon 2024**. Our team created an interactive water conservation platform and ranked in the **Top 33 out of 400 teams** at the zonal level.\n\n## Sports: Volleyball and Cricket\n\nStaying active on campus is essential for my focus and productivity. I regularly play **Volleyball** and **Cricket**, which have taught me valuable lessons about team chemistry, coordination, and leadership that carry over directly into software development.`,
    coverImage: null,
    readingMinutes: 3,
    publishedAt: '2025-01-10T00:00:00.000Z',
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2025-01-10T00:00:00.000Z',
    tags: [TAGS.java, TAGS.javascript],
  },
]
