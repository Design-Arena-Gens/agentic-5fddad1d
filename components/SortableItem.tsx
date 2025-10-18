"use client"
import React from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'

export function SortableItem({ id, children }: { id: string, children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({ id })
  const style: React.CSSProperties = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : {}
  return (
    <div ref={setDragRef} style={style} {...listeners} {...attributes} className={`${isDragging ? 'opacity-70' : ''}`}>
      {children}
    </div>
  )
}
