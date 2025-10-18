export type MediaType = 'movie' | 'tv'
export type CategoryKey = 'watching' | 'planned' | 'watched' | 'dropped'

export interface WatchItem {
  id: string
  title: string
  mediaType: MediaType
  posterUrl: string
  score: number | null
  notes?: string
  createdAt: number
}

export interface WatchlistState {
  itemsById: Record<string, WatchItem>
  order: Record<CategoryKey, string[]>
}
