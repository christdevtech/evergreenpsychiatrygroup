import { cn } from '@/utilities/ui'
import React from 'react'

import { StaffCard, StaffCardData } from '@/components/StaffCard'

export type Props = {
  staff: StaffCardData[]
  cardBGColor: string | null | undefined
}

export const CollectionStaff: React.FC<Props> = (props) => {
  const { staff, cardBGColor } = props

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {staff?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index}>
                <StaffCard
                  className={cn('h-full')}
                  doc={result}
                  relationTo="staff"
                  aspectRatio="aspect-square"
                  bgColor={cardBGColor}
                />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
