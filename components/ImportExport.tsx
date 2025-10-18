"use client"
import React, { useRef } from 'react'
import { useWatchlistStore } from '@/lib/store'

export function ImportExport() {
  const state = useWatchlistStore(s => ({ itemsById: s.itemsById, order: s.order }))
  const importState = useWatchlistStore(s => s.importState)
  const fileRef = useRef<HTMLInputElement>(null)

  const doExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'watchlist.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const doImport = async (file: File) => {
    const text = await file.text()
    try {
      const json = JSON.parse(text)
      importState(json)
    } catch {}
  }

  return (
    <div className="flex gap-2">
      <button onClick={doExport} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">Export</button>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) doImport(f); e.currentTarget.value = '' }} />
      <button onClick={() => fileRef.current?.click()} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">Import</button>
    </div>
  )
}
