"use client"
import React, { useMemo, useState } from 'react'
import { CategoryKey, WatchItem } from './types'
import { useWatchlistStore } from '@/lib/store'
import { ItemCard } from './ItemCard'
import { DragEndEvent, useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { EditPanel } from './EditPanel'

export function CategorySection({ title, category }: { title: string, category: CategoryKey }) {
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const { itemsById, order, updateItem, moveItem } = useWatchlistStore(s => ({ itemsById: s.itemsById, order: s.order, updateItem: s.updateItem, moveItem: s.moveItem }))

  const items: WatchItem[] = useMemo(() => {
    const ids = order[category]
    const list = ids.map(id => itemsById[id]).filter(Boolean)
    return filter === 'all' ? list : list.filter(i => i.mediaType === filter)
  }, [order, itemsById, category, filter])

  // DnD handled at page level

  return (
    <DroppableCategory id={category}>
      <div className="glass rounded-2xl p-4 flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold tracking-wide">{title}</div>
        <div className="flex gap-2 text-xs">
          <button onClick={() => setFilter('all')} className={`px-2 py-1 rounded-md ${filter==='all'?'bg-white/20':'bg-white/10 hover:bg-white/15'}`}>All</button>
          <button onClick={() => setFilter('movie')} className={`px-2 py-1 rounded-md ${filter==='movie'?'bg-white/20':'bg-white/10 hover:bg-white/15'}`}>Movies</button>
          <button onClick={() => setFilter('tv')} className={`px-2 py-1 rounded-md ${filter==='tv'?'bg-white/20':'bg-white/10 hover:bg-white/15'}`}>TV</button>
        </div>
      </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
          {items.map((item) => (
            <SortableContext key={item.id} items={[item.id]} strategy={rectSortingStrategy}>
              <SortableItem id={item.id}>
                <ItemCard
                  item={item}
                  onClickPoster={() => setEditingId(item.id)}
                  onScoreChange={(n) => updateItem(item.id, { score: n })}
                />
              </SortableItem>
            </SortableContext>
          ))}
          {items.length === 0 && (
            <div className="col-span-2 md:col-span-4 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-white/50 text-sm min-h-[180px]">Drop items here</div>
          )}
        </div>
      {editingId && <EditPanel id={editingId} onClose={() => setEditingId(null)} />}
      </div>
    </DroppableCategory>
  )
}

function DroppableCategory({ id, children }: { id: string, children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className="min-h-[340px]">
      {children}
    </div>
  )
}
