"use client"
import React, { useState } from 'react'
import { SearchBox } from './SearchBox'
import { ManualEntry } from './ManualEntry'
import { ImportExport } from './ImportExport'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [tab, setTab] = useState<'search' | 'manual'>('search')

  return (
    <div className={`relative h-full transition-[width] duration-300 ${collapsed ? 'w-[56px]' : 'w-[320px]'} `}>
      <div className={`h-full glass rounded-2xl p-3 pr-2 overflow-hidden ${collapsed ? 'px-2' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          {!collapsed && <div className="font-semibold tracking-wide">Watchlist</div>}
          <div className="ml-auto" />
          <button aria-label="Toggle sidebar" onClick={() => setCollapsed(v => !v)} className="p-2 rounded-md bg-white/10 hover:bg-white/20">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        {!collapsed && (
          <div className="space-y-4 overflow-y-auto h-[calc(100%-40px)] pr-1 scrollbar-thin">
            <div className="flex gap-2 bg-white/5 rounded-lg p-1">
              <button onClick={() => setTab('search')} className={`flex-1 py-2 rounded-md text-sm ${tab === 'search' ? 'bg-white/10' : 'hover:bg-white/10'}`}>Search</button>
              <button onClick={() => setTab('manual')} className={`flex-1 py-2 rounded-md text-sm ${tab === 'manual' ? 'bg-white/10' : 'hover:bg-white/10'}`}>Manual</button>
            </div>
            {tab === 'search' ? <SearchBox /> : <ManualEntry />}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-white/70">Filters</div>
              <div className="flex gap-2 text-sm">
                <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">All</button>
                <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">Movies</button>
                <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">TV</button>
              </div>
            </div>
            <ImportExport />
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-white/70">Settings</div>
              <div className="text-xs text-white/60">Minimal text. Clean UI.</div>
            </div>
          </div>
        )}
      </div>
      {collapsed && (
        <button aria-label="Expand sidebar" onClick={() => setCollapsed(false)} className="absolute -right-3 top-3 p-2 rounded-full glass">
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  )
}
