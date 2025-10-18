"use client"
import React, { useState } from 'react'
import { CategoryKey, MediaType, WatchItem } from './types'
import { useWatchlistStore } from '@/lib/store'

export function ManualEntry() {
  const add = useWatchlistStore(s => s.addItem)
  const [title, setTitle] = useState('')
  const [posterUrl, setPosterUrl] = useState('')
  const [mediaType, setMediaType] = useState<MediaType>('movie')
  const [category, setCategory] = useState<CategoryKey>('planned')

  const submit = () => {
    if (!title.trim()) return
    add({ id: `manual_${Date.now()}`, title, posterUrl, mediaType, score: null, createdAt: Date.now() }, category)
    setTitle(''); setPosterUrl('')
  }

  return (
    <div className="space-y-2">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full bg-white/5 rounded-md px-3 py-2 outline-none focus:ring-2 ring-white/20" />
      <input value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} placeholder="Poster URL (optional)" className="w-full bg-white/5 rounded-md px-3 py-2 outline-none focus:ring-2 ring-white/20" />
      <div className="flex gap-2">
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value as MediaType)} className="bg-white/10 rounded-md px-2 text-sm">
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as CategoryKey)} className="bg-white/10 rounded-md px-2 text-sm">
          <option value="planned">Plan</option>
          <option value="watching">Now</option>
          <option value="watched">Watched</option>
          <option value="dropped">Dropped</option>
        </select>
        <button onClick={submit} className="ml-auto px-3 py-2 bg-white/80 hover:bg-white text-black rounded-md">Add</button>
      </div>
    </div>
  )
}
