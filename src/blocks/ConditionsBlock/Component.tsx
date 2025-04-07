import React from 'react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { Check } from 'lucide-react'
// import type { ConditionsBlock as ConditionsBlockProps } from '@/payload-types'

// Define the types for our block since it's not yet in payload-types

interface ConditionItem {
  condition: string
}

interface BenefitItem {
  benefit: string
}

type LinkAppearance =
  | 'default'
  | 'outline'
  | 'destructive'
  | 'ghost'
  | 'secondary'
  | 'link'
  | 'inline'
  | null

interface ConditionsBlockProps {
  leftColumn?: {
    backgroundColor?: string
    title?: string
    conditions?: ConditionItem[]
    link?: {
      label: string
      appearance?: LinkAppearance
      [key: string]: any
    }
    moreLink?: {
      label: string
      appearance?: LinkAppearance
      [key: string]: any
    }
  }
  rightColumn?: {
    backgroundColor?: string
    title?: string
    benefits?: BenefitItem[]
  }
}

type Props = ConditionsBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ConditionsBlock: React.FC<ConditionsBlockProps> = (props) => {
  const { leftColumn, rightColumn } = props

  return (
    <div className={cn('relative py-12 md:py-16 xl:py-24')}>
      <div className={cn('container')}>
        <div className="flex flex-col lg:flex-row">
          {/* Left Column */}
          <div
            className={cn(
              'p-8 py-16 md:p-16  relative z-1 w-full lg:w-[45%]',
              leftColumn?.backgroundColor || 'bg-emerald-700',
            )}
          >
            <div className="flex flex-col h-full w-full lg:w-[80%]">
              {leftColumn?.title && (
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {leftColumn.title}
                </h2>
              )}

              {leftColumn?.conditions && leftColumn.conditions.length > 0 && (
                <div className="flex flex-col space-y-8 mb-8">
                  <p className="text-white text-lg mb-2">Do you suffer any of the following</p>
                  <ul className="space-y-8">
                    {leftColumn.conditions.map((item, index: number) => (
                      <li key={index} className="text-white text-lg">
                        {item.condition}
                      </li>
                    ))}
                    {leftColumn.moreLink && (
                      <li className="text-white text-lg underline">
                        <CMSLink {...leftColumn.moreLink} />
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {leftColumn?.link && (
                <div className="mt-auto">
                  <CMSLink
                    {...leftColumn.link}
                    className="inline-block rounded-full bg-white hover:text-white text-black px-6 py-3 font-medium"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className={cn('w-full lg:w-[55%] relative flex flex-col justify-center')}>
            <div
              className={cn(
                'p-8 py-16 md:p-16 flex flex-col z-10 lg:w-[120%] lg:-ml-[20%] lg:rounded-r-2xl',
                rightColumn?.backgroundColor || 'bg-berylgreen-500',
              )}
            >
              {rightColumn?.title && (
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  {rightColumn.title}
                </h3>
              )}

              {rightColumn?.benefits && rightColumn.benefits.length > 0 && (
                <ul className="space-y-0 divide-y-2 divide-white">
                  {rightColumn.benefits.map((item, index: number) => (
                    <li key={index} className="py-8 gap-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <span className="text-gray-800">{item.benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
