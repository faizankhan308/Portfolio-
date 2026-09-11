export interface RecommendationAuthorData {
  id: string
  provider: 'github' | 'linkedin'
  displayName: string
  username: string
  avatarUrl: string
  profileUrl: string
  role?: string
}

export interface RecommendationData {
  id: string
  comment: string
  status: 'APPROVED'
  createdAt: string
  author: RecommendationAuthorData
}

export const RECOMMENDATIONS: RecommendationData[] = [
  {
    id: 'rec-1',
    comment: 'Faizan is an exceptional developer who combines technical rigor with quick problem-solving. During his work on SA Raichur Service Point, he delivered an intuitive, responsive marketplace interface that exceeded client expectations.',
    status: 'APPROVED',
    createdAt: '2024-10-15T00:00:00.000Z',
    author: {
      id: 'auth-1',
      provider: 'github',
      displayName: 'Client Testimonial',
      username: 'saraichur',
      avatarUrl: '/profile.png',
      profileUrl: 'https://sa-raichur-service-point.vercel.app/',
      role: 'Client & Stakeholder',
    },
  },
  {
    id: 'rec-2',
    comment: 'Faizan demonstrated strong expertise in web development, database integration, and component architecture during his work at Donam Mart LLP. He writes clean, modular code and adapts rapidly to technical requirements.',
    status: 'APPROVED',
    createdAt: '2024-11-01T00:00:00.000Z',
    author: {
      id: 'auth-2',
      provider: 'github',
      displayName: 'Donam Mart Team',
      username: 'donammart',
      avatarUrl: '/profile.png',
      profileUrl: 'https://github.com/faizankhan308',
      role: 'Engineering Mentor',
    },
  },
]
