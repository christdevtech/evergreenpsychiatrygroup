'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
// import { RichText } from '@/components/RichText'

import type { EmergenciesBlock as EmergenciesBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = EmergenciesBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const EmergenciesBlock: React.FC<Props> = (props) => {
  const {
    title,
    titleClasses,
    mainText,
    mainTextClasses,
    backgroundColor,
    padding,
    emergencyCases,
    suicideHotline,
    className,
  } = props

  return (
    <section className={cn(backgroundColor, padding, className)}>
      <div className="container mx-auto px-4">
        <h2 className={cn(titleClasses)}>{title}</h2>

        <RichText data={mainText} enableProse={false} className={cn(mainTextClasses)} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Emergency Cases */}
          <div>
            <h3 className={cn(emergencyCases?.titleClasses)}>{emergencyCases?.title}</h3>
            <hr className="mb-6 mt-2 border-t border-teal-100" />
            <ul className="space-y-4">
              {emergencyCases?.cases?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-teal-300 mr-4 mt-1 flex-shrink-0"></span>
                  <span className="text-white text-lg md:text-xl">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suicide Hotline */}
          <div>
            <h3 className={cn(suicideHotline?.titleClasses)}>{suicideHotline?.title}</h3>
            <hr className="mb-6 mt-2 border-t border-teal-100" />
            <ul className="space-y-4">
              {suicideHotline?.phoneNumbers?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-teal-300 mr-4 mt-1 flex-shrink-0"></span>
                  <span className="text-white text-lg md:text-xl">{item.number}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
