import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText, richTextClasses }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {richText && (
          <RichText className={cn(richTextClasses)} data={richText} enableGutter={false} />
        )}
      </div>
    </div>
  )
}
