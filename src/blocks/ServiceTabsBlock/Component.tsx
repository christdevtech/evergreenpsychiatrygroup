'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

import type { ServiceTabsBlock as ServiceTabsBlockType } from '@/payload-types'
import { ServiceTabs } from './subs/ServiceTabs'

type Props = ServiceTabsBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const ServiceTabsBlock: React.FC<Props> = (props) => {
  const { className, blockBGColor } = props

  return (
    <div className={cn(className, blockBGColor)}>
      <ServiceTabs {...props} />
    </div>
  )
}
