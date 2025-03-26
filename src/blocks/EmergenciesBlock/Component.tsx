'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
// import { RichText } from '@/components/RichText'

import type { EmergenciesBlock as EmergenciesBlockType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import Link from 'next/link'

type Props = EmergenciesBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const EmergenciesBlock: React.FC<Props> = (props) => {
  const {
    title,
    titleClasses,
    subtitle,
    subtitleClasses,
    mainText,
    mainTextClasses,
    subText,
    subTextClasses,
    backgroundColor,
    padding,
    emergencyCases,
    suicideHotline,
    className,
    localizedResources,
  } = props

  return (
    <section className={cn(backgroundColor, padding, className)}>
      <div className="container">
        <h2 className={cn(titleClasses)} dangerouslySetInnerHTML={{ __html: title }} />
        <RichText
          data={mainText}
          enableProse={false}
          enableGutter={false}
          className={cn(mainTextClasses)}
        />
        <h3 className={cn(subtitleClasses)} dangerouslySetInnerHTML={{ __html: subtitle }} />
        <RichText
          data={subText}
          enableProse={false}
          enableGutter={false}
          className={cn(subTextClasses)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Emergency Cases */}
          <div>
            <h3 className={cn(emergencyCases?.titleClasses)}>{emergencyCases?.title}</h3>
            <hr className="mb-6 mt-2 border-t border-teal-300" />
            <ul className="space-y-4">
              {emergencyCases?.cases?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-teal-300 mr-4 mt-1 flex-shrink-0"></span>
                  <span className="text-white text-xl md:text-2xl">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suicide Hotline */}
          <div>
            <h3 className={cn(suicideHotline?.titleClasses)}>{suicideHotline?.title}</h3>
            <hr className="mb-6 mt-2 border-t border-teal-300" />
            <ul className="space-y-4">
              {suicideHotline?.phoneNumbers?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 rounded-full bg-teal-300 mr-4 mt-1 flex-shrink-0"></span>
                  <span className="text-white text-xl md:text-2xl">{item.number}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {localizedResources?.map((item, index) => (
          <div key={index} className="pt-16">
            <h3 className={cn(item.titleClasses)}>{item.title}</h3>
            <RichText
              data={item.description}
              enableProse={false}
              enableGutter={false}
              className={cn(item.descriptionClasses)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {item.resources?.map((resource, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-teal-300 pb-4">
                  <Media resource={resource.icon} alt={resource.text} className="w-6 h-6" />
                  <Link href={resource.link} className="text-white text-xl md:text-2xl">
                    {resource.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
