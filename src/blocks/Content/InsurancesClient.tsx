'use client'

import { cn } from '@/utilities/ui'
import React, { useState, useRef } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { ArrowUpIcon, Play } from 'lucide-react'

interface InsurancesProps {
  insuranceTitle?: string
  insuranceTitleClasses?: string[]
  insuranceImages?: Array<{
    image?: string | MediaType
    name?: string
    url?: string
  }>
  gridColumns?: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  infoText?: any
  showAllButtonText?: string
  hideAllButtonText?: string
  allInsurancesList?: Array<{
    name: string
  }>
  bgColor?: string
}

export const InsurancesClient: React.FC<InsurancesProps> = ({
  insuranceTitle,
  insuranceTitleClasses,
  insuranceImages,
  gridColumns,
  infoText,
  showAllButtonText,
  hideAllButtonText,
  allInsurancesList,
  bgColor,
}) => {
  // State for toggle functionality
  const [showAllInsurances, setShowAllInsurances] = useState(false)
  const insuranceSectionRef = useRef<HTMLDivElement>(null)

  // Get grid column classes based on configuration
  const getGridColumnClasses = () => {
    const sm = gridColumns?.sm || '2'
    const md = gridColumns?.md || '3'
    const lg = gridColumns?.lg || '4'
    const xl = gridColumns?.xl || '4'

    // Map configuration values to Tailwind classes
    const smColumnsMap: Record<string, string> = {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
    }

    const mdColumnsMap: Record<string, string> = {
      '2': 'md:grid-cols-2',
      '3': 'md:grid-cols-3',
      '4': 'md:grid-cols-4',
      '5': 'md:grid-cols-5',
      '6': 'md:grid-cols-6',
    }

    const lgColumnsMap: Record<string, string> = {
      '3': 'lg:grid-cols-3',
      '4': 'lg:grid-cols-4',
      '5': 'lg:grid-cols-5',
      '6': 'lg:grid-cols-6',
      '7': 'lg:grid-cols-7',
      '8': 'lg:grid-cols-8',
    }

    const xlColumnsMap: Record<string, string> = {
      '3': 'xl:grid-cols-3',
      '4': 'xl:grid-cols-4',
      '5': 'xl:grid-cols-5',
      '6': 'xl:grid-cols-6',
      '7': 'xl:grid-cols-7',
      '8': 'xl:grid-cols-8',
    }

    return cn(
      smColumnsMap[sm] || 'grid-cols-2',
      mdColumnsMap[md] || 'md:grid-cols-3',
      lgColumnsMap[lg] || 'lg:grid-cols-4',
      xlColumnsMap[xl] || 'xl:grid-cols-4',
    )
  }

  const toggleInsurancesList = () => {
    const newState = !showAllInsurances
    setShowAllInsurances(newState)

    // Scroll behavior
    if (!newState && insuranceSectionRef.current) {
      // When closing the list, scroll back to the section top
      insuranceSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else if (newState) {
      // When opening, allow a small delay for the animation to start
      setTimeout(() => {
        const expandedSection = document.getElementById('expanded-insurances')
        expandedSection?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    }
  }

  return (
    <div
      id="insurances-section"
      ref={insuranceSectionRef}
      className={cn('w-full py-16 px-8 rounded-2xl', bgColor)}
    >
      {insuranceTitle && (
        <h2
          className={cn('text-3xl md:text-4xl font-bold text-center mb-12', insuranceTitleClasses)}
        >
          {insuranceTitle}
        </h2>
      )}

      {/* Insurance Logo Grid */}
      {insuranceImages && insuranceImages.length > 0 && (
        <div className={cn('grid gap-8 mb-12', getGridColumnClasses())}>
          {insuranceImages.map((insurance, index) => (
            <div key={`insurance-logo-${index}`} className="flex items-center justify-left p-2">
              {insurance.url ? (
                <a
                  href={insurance.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  {insurance.image && (
                    <Media
                      resource={insurance.image}
                      imgClassName="w-full h-auto max-h-16 object-contain"
                      alt={insurance.name || 'Insurance logo'}
                    />
                  )}
                </a>
              ) : (
                <div className="flex flex-col items-center">
                  {insurance.image && (
                    <Media
                      resource={insurance.image}
                      imgClassName="w-full h-auto max-h-16 object-contain"
                      alt={insurance.name || 'Insurance logo'}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Call to action text below logos */}
      {infoText && (
        <div className="text-center mb-8">
          <RichText
            data={infoText}
            enableGutter={false}
            enableProse={false}
            className="text-lg md:text-xl"
          />
        </div>
      )}

      {/* Toggle button */}
      <div className={cn('flex justify-center mb-8', showAllInsurances ? 'hidden' : '')}>
        <button
          onClick={toggleInsurancesList}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md transition-colors rounded-xl"
        >
          {showAllInsurances ? hideAllButtonText : showAllButtonText}
        </button>
      </div>

      {/* Expandable insurance list */}
      {allInsurancesList && allInsurancesList.length > 0 && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-500 ease-in-out',
            showAllInsurances
              ? 'max-h-[5000px] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-4',
          )}
        >
          <div className="w-full h-1 bg-teal-600 flex justify-center my-8">
            <Play fill="#009689" className="h-12 w-12 rotate-90 text-teal-600 -mt-2" />
          </div>
          <div id="expanded-insurances" className="w-full pt-12">
            <h3 className="text-2xl md:text-3xl font-bold text-teal-700 mb-8">All Insurances</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 gap-x-16 mb-12">
              {allInsurancesList.map((insurance, index) => (
                <div key={`insurance-item-${index}`} className="py-2 border-b-2 border-teal-600">
                  <span className="text-lg font-medium">{insurance.name}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={toggleInsurancesList}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md transition-colors rounded-xl flex items-center"
              >
                {hideAllButtonText}
                <ArrowUpIcon className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
