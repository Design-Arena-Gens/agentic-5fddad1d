"use client"
import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useWatchlistStore } from '@/lib/store'

export function EditPanel({ id, onClose }: { id: string, onClose: () => void }) {
  const item = useWatchlistStore(s => s.itemsById[id])
  const update = useWatchlistStore(s => s.updateItem)
  const remove = useWatchlistStore(s => s.removeItem)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative glass rounded-2xl p-6 w-[90vw] max-w-2xl animate-in fade-in duration-200">
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20">
          <X size={18} />
        </button>
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'} alt={item.title} className="h-56 w-40 object-cover rounded-lg" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-white/70">Title</label>
              <input value={item.title} onChange={(e) => update(item.id, { title: e.target.value })} className="w-full bg-white/5 rounded-md px-3 py-2 outline-none focus:ring-2 ring-white/20" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-white/70">Poster URL</label>
              <input value={item.posterUrl} onChange={(e) => update(item.id, { posterUrl: e.target.value })} className="w-full bg-white/5 rounded-md px-3 py-2 outline-none focus:ring-2 ring-white/20" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-white/70">Score</label>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => update(item.id, { score: n })} className={`px-2 py-1 rounded-md text-xs transition-colors ${item.score === n ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}>{n}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-white/70">Notes</label>
              <textarea value={item.notes || ''} onChange={(e) => update(item.id, { notes: e.target.value })} rows={4} className="w-full bg-white/5 rounded-md px-3 py-2 outline-none focus:ring-2 ring-white/20" />
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => { remove(item.id); onClose() }} className="px-3 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-md">Delete</button>
              <button onClick={onClose} className="px-3 py-2 bg-white/80 hover:bg-white text-black rounded-md">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
