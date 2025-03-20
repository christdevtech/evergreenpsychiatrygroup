import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  function percentageToColSpan(width: number | string): string {
    const percentage = Number(width)

    if (isNaN(percentage)) {
      return 'col-span-12'
    }

    if (percentage < 0 || percentage > 100) {
      return 'col-span-12'
    }

    // Calculate the number of columns based on the percentage
    const columns = Math.round((percentage / 100) * 12)

    // Ensure the columns are at least 1 and at most 12
    const colSpan = Math.min(Math.max(columns, 1), 12)

    // Return the Tailwind CSS class
    return `col-span-12 md:col-span-${colSpan}`
  }
  const widthClass = width ? percentageToColSpan(width) : ''
  return <div className={cn(className, widthClass)}>{children}</div>
}
