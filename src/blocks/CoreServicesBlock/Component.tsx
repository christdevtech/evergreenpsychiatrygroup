'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'

import type { CoreServicesBlock as CoreServicesBlockType } from '@/payload-types'
import { CoreServices } from './subs/CoreServices'
import { CoreConditions } from './subs/CoreConditions'

type Props = CoreServicesBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const CoreServicesBlock: React.FC<Props> = (props) => {
  const { isConditions, className, padding, blockBGColor } = props

  return (
    <div className={cn(padding, className, blockBGColor)}>
      {isConditions ? <CoreConditions {...props} /> : <CoreServices {...props} />}
    </div>
  )
}
