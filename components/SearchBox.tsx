"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CategoryKey, MediaType, WatchItem } from './types'
import { useWatchlistStore } from '@/lib/store'
import { Plus } from 'lucide-react'

async function searchItunes(term: string) {
  const url = new URL('https://itunes.apple.com/search')
  url.searchParams.set('term', term)
  url.searchParams.set('media', 'movie')
  url.searchParams.set('limit', '10')
  const res = await fetch(url.toString())
  const data = await res.json()
  return (data.results || []).map((r: any) => ({
    id: `itunes_${r.trackId}`,
    title: r.trackName,
    mediaType: 'movie' as MediaType,
    posterUrl: r.artworkUrl100?.replace('100x100', '300x300') || '',
  }))
}

async function searchTvMaze(term: string) {
  const url = new URL('https://api.tvmaze.com/search/shows')
  url.searchParams.set('q', term)
  const res = await fetch(url.toString())
  const data = await res.json()
  return (data || []).map((r: any) => ({
    id: `tvmaze_${r.show.id}`,
    title: r.show.name,
    mediaType: 'tv' as MediaType,
    posterUrl: r.show.image?.medium || r.show.image?.original || '',
  }))
}

function useDebounced<T>(value: T, delay: number) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}

export function SearchBox() {
  const addItem = useWatchlistStore(s => s.addItem)
  const [term, setTerm] = useState('')
  const dTerm = useDebounced(term, 300)
  const [results, setResults] = useState<Array<{ id: string; title: string; mediaType: MediaType; posterUrl: string }>>([])
  const [category, setCategory] = useState<CategoryKey>('planned')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dTerm.trim()) { setResults([]); return }
    let cancelled = false
    ;(async () => {
      try {
        const [a, b] = await Promise.all([searchItunes(dTerm), searchTvMaze(dTerm)])
        if (!cancelled) setResults([...a, ...b].slice(0, 15))
      } catch {
        setResults([])
      }
    })()
    return () => { cancelled = true }
  }, [dTerm])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const onSelect = (r: { id: string; title: string; mediaType: MediaType; posterUrl: string }) => {
    const item: WatchItem = {
      id: `${r.id}`,
      title: r.title,
      mediaType: r.mediaType,
      posterUrl: r.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image',
      score: null,
      createdAt: Date.now(),
    }
    addItem(item, category)
    setTerm('')
    setResults([])
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="space-y-2">
      <div className="flex gap-2">
        <input
          value={term}
          onChange={(e) => { setTerm(e.target.value); setOpen(true) }}
          placeholder="Search movies & shows"
          className="w-full bg-white/5 rounded-md px-3 py-2 outline-none focus:ring-2 ring-white/20"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value as CategoryKey)} className="bg-white/10 rounded-md px-2 text-sm">
          <option value="planned">Plan</option>
          <option value="watching">Now</option>
          <option value="watched">Watched</option>
          <option value="dropped">Dropped</option>
        </select>
      </div>
      {open && results.length > 0 && (
        <div className="max-h-80 overflow-auto rounded-lg glass divide-y divide-white/10">
          {results.map((r) => (
            <button key={r.id} onClick={() => onSelect(r)} className="w-full text-left flex items-center gap-3 p-2 hover:bg-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.posterUrl || 'https://via.placeholder.com/80x120?text=No+Image'} alt="" className="h-14 w-10 object-cover rounded" />
              <div className="flex-1">
                <div className="text-sm font-medium">{r.title}</div>
                <div className="text-xs text-white/60 uppercase">{r.mediaType}</div>
              </div>
              <Plus size={16} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
