"use client"
import React from 'react'

export function RatingChips({ value, onChange }: { value: number | null, onChange: (v: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`px-2 py-1 rounded-md text-xs transition-colors ${value === n ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}
