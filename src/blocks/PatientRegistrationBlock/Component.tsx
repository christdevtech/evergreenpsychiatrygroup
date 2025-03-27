'use client'

import React from 'react'
import { cn } from '@/utilities/ui'

import type { PatientRegistrationBlock as PatientRegistrationBlockType } from '@/payload-types'
import { PatientRegistration } from './subs/PatientRegistration'

type Props = PatientRegistrationBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const PatientRegistrationBlock: React.FC<Props> = (props) => {
  const { className, padding, blockBGColor } = props

  return (
    <div className={cn(padding, className, blockBGColor)}>
      <PatientRegistration {...props} />
    </div>
  )
}
