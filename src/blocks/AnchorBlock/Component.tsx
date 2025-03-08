'use client'

import React, { useEffect, useRef } from 'react'

// Define the props interface for the AnchorBlock component
type AnchorBlockProps = {
  id: string
  label?: string
}

export const AnchorBlock: React.FC<AnchorBlockProps> = ({ id }) => {
  const anchorRef = useRef<HTMLDivElement>(null)

  // This useEffect will only run on the client side
  useEffect(() => {
    // Safe to access window here since useEffect only runs on the client
    const hash = window.location.hash.substring(1)

    if (hash === id && anchorRef.current) {
      // Add a small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        anchorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    }
  }, [id])

  // The initial render is the same on both server and client
  return <div id={id} ref={anchorRef} className="scroll-mt-20" aria-hidden="true" />
}
