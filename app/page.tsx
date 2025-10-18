"use client"
import React from 'react'
import { Sidebar } from '@/components/Sidebar'
import { CategorySection } from '@/components/CategorySection'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useWatchlistStore } from '@/lib/store'
import { CategoryKey } from '@/components/types'

export default function Page() {
  const moveItem = useWatchlistStore(s => s.moveItem)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const onDragEnd = (e: DragEndEvent) => {
    const id = e.active.id as string
    const overId = e.over?.id as string | undefined
    if (!overId) return
    moveItem(id, overId as CategoryKey)
  }
  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-[auto,1fr] gap-4">
          <Sidebar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategorySection title="Currently Watching" category="watching" />
            <CategorySection title="Planning to Watch" category="planned" />
            <CategorySection title="Watched" category="watched" />
            <CategorySection title="Dropped" category="dropped" />
          </div>
        </div>
      </div>
    </DndContext>
  )
}
