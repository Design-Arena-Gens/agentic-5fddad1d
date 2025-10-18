"use client"
import React, { useState } from 'react'
import { WatchItem } from './types'
import { RatingChips } from './RatingChips'

export function ItemCard({ item, onClickPoster, onScoreChange }: { item: WatchItem, onClickPoster: () => void, onScoreChange: (n: number) => void }) {
  const [showNotes, setShowNotes] = useState(false)
  return (
    <div className="group rounded-xl overflow-hidden glass hover:bg-white/10 transition-colors">
      <div className="relative cursor-pointer" onClick={onClickPoster}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'} alt={item.title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="truncate font-medium" title={item.title}>{item.title}</div>
          {item.score != null && <div className="text-xs px-2 py-1 rounded-md bg-white/10">{item.score}</div>}
        </div>
        <RatingChips value={item.score ?? null} onChange={onScoreChange} />
        <button onClick={() => setShowNotes(v => !v)} className="text-xs text-white/70 hover:text-white">{showNotes ? 'Hide notes' : 'Notes'}</button>
        {showNotes && (
          <div className="text-sm text-white/80 line-clamp-4 whitespace-pre-wrap">{item.notes || 'No notes'}</div>
        )}
      </div>
    </div>
  )
}
