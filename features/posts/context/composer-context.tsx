'use client'

import React, { createContext, useContext, useState } from 'react'

interface ComposerContextValue {
  isOpen: boolean
  openComposer: () => void
  closeComposer: () => void
}

const ComposerContext = createContext<ComposerContextValue | undefined>(undefined)

export function ComposerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openComposer = () => setIsOpen(true)
  const closeComposer = () => setIsOpen(false)

  return (
    <ComposerContext.Provider value={{ isOpen, openComposer, closeComposer }}>
      {children}
    </ComposerContext.Provider>
  )
}

export function useComposer() {
  const context = useContext(ComposerContext)
  if (!context) {
    throw new Error('useComposer must be used within a ComposerProvider')
  }
  return context
}
