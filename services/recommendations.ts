import { RECOMMENDATIONS, type RecommendationData } from '@/lib/data/recommendations'

export type RecommendationWithAuthor = RecommendationData
export type RecommendationMeResponse = { author: RecommendationData['author'] | null }

export async function getRecommendations(): Promise<RecommendationWithAuthor[]> {
  return RECOMMENDATIONS
}

export async function getRecommendationAuthor(): Promise<RecommendationMeResponse | null> {
  return null
}

export async function submitRecommendation(comment: string, _linkedinUrl?: string): Promise<void> {
  console.log('[Recommendation Submitted]:', comment)
}
