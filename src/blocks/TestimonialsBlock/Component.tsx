'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import TestimonialSlider from '@/components/TestimonialSlider'
import { Testimonial, TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = (props) => {
  const {
    title,
    titleClasses,
    testimonials,
    backgroundImage,
    blockBGColor = 'bg-transparent',
    testimonialBGColor = 'bg-white',
  } = props

  return (
    <div className={cn('w-full relative py-16 md:py-24', blockBGColor)}>
      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center">{title && <h2 className={cn(titleClasses)}>{title}</h2>}</div>

        {/* Two-column layout for image and testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch rounded-2xl mt-0 md:mt-16 lg:mt-24">
          {/* Left Column - Background Image */}
          <div className="hidden md:block md:col-span-1 lg:col-span-2 relative aspect-square lg:aspect-square xl:aspect-[6/5] 2xl:aspect-[7/5] rounded-2xl overflow-hidden shadow-xl">
            {backgroundImage && typeof backgroundImage !== 'string' && (
              <Media
                resource={backgroundImage}
                imgClassName="h-full object-cover"
                alt={backgroundImage.alt || 'Testimonial background'}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-slate-900/40" />
          </div>

          {/* Right Column - Testimonial Swiper */}
          <div className="md:col-span-4 lg:col-span-3 overflow-hidden relative">
            {testimonials.length > 0 && (
              <TestimonialSlider
                testimonialBGColor={testimonialBGColor}
                testimonials={testimonials as Testimonial[]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
