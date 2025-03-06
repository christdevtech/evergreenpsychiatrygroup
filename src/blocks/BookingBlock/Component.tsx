'use client'

import React, { useState, useEffect } from 'react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { ChevronDown, MoveRight } from 'lucide-react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { BookingBlock as BookingBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

type Props = BookingBlockType & {
  className?: string
}

// Custom Accordion components for the BookingBlock
const BookingAccordion = AccordionPrimitive.Root

const BookingAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />
))
BookingAccordionItem.displayName = 'BookingAccordionItem'

const BookingAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:no-underline',
        className,
      )}
      {...props}
    >
      {children}
      <div className="flex items-center justify-center transition-transform duration-200">
        <ChevronDown className="h-5 w-5 data-[state=open]:hidden" />
        <MoveRight className="h-5 w-5 hidden data-[state=open]:block" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
BookingAccordionTrigger.displayName = 'BookingAccordionTrigger'

const BookingAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
BookingAccordionContent.displayName = 'BookingAccordionContent'

export const BookingBlock: React.FC<Props> = (props) => {
  const {
    backgroundColor,
    accentColor,
    title,
    description,
    bookingOptions,
    link,
    buttonClasses,
    className,
    ending,
  } = props

  // Initialize with empty string, will be set to first item in useEffect
  const [activeOption, setActiveOption] = useState('')

  // Set the first option as active by default
  useEffect(() => {
    if (bookingOptions && bookingOptions.length > 0) {
      setActiveOption(`item-0`)
    }
  }, [bookingOptions])

  const handleAccordionValueChange = (value: string) => {
    // If value is empty (all accordions closed), set to first item
    if (!value && bookingOptions && bookingOptions.length > 0) {
      setActiveOption(`item-0`)
    } else {
      setActiveOption(value)
    }
  }

  // Always show the first option's media if no active option or if all accordions are closed
  const activeIndex = activeOption ? parseInt(activeOption.split('-')[1] || '0') : 0
  const activeMedia =
    bookingOptions && bookingOptions.length > 0 ? bookingOptions[activeIndex]?.media : null

  // Prepare button classes
  const bgColorString = backgroundColor ? String(backgroundColor) : 'bg-white'
  const accentColorString = accentColor ? String(accentColor) : 'bg-teal-500'

  return (
    <div className={cn('py-16 md:py-24', bgColorString, className)}>
      <div className="container">
        {/* Title and Description - Always at the top */}
        <div className="mb-8 md:mb-12 md:hidden">
          {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
          {description && (
            <p className="text-xl md:text-2xl font-medium text-teal-600">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Media - First on mobile, second on desktop */}
          <div className="order-1 md:order-2 relative">
            {activeMedia && (
              <div className="relative">
                <div className="relative z-10">
                  <Media resource={activeMedia} className="w-full h-auto rounded-lg" />
                </div>
              </div>
            )}
          </div>

          {/* Accordion and Button - Second on mobile, first on desktop */}
          <div className="order-2 md:order-1 flex flex-col">
            <div className="mb-8 md:mb-12 md:block hidden">
              {title && <h2 className="text-3xl md:text-4xl font-bold mb-4 lg:mb-12">{title}</h2>}
              {description && (
                <p className="text-xl md:text-2xl font-medium text-teal-600">{description}</p>
              )}
            </div>
            {bookingOptions && bookingOptions.length > 0 && (
              <BookingAccordion
                type="single"
                collapsible
                className="mb-8 divide-y divide-teal-300"
                value={activeOption}
                onValueChange={handleAccordionValueChange}
              >
                {bookingOptions.map((option, index) => (
                  <BookingAccordionItem key={index} value={`item-${index}`} className="py-2">
                    <BookingAccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                      <span className="text-left font-medium text-xl md:text-2xl text-slate-900">
                        {option.title}
                      </span>
                    </BookingAccordionTrigger>
                    <BookingAccordionContent className="pt-2 pb-2 text-base md:text-lg lg:text-xl">
                      {option.content && (
                        <RichText enableGutter={false} data={option.content} enableProse={false} />
                      )}
                    </BookingAccordionContent>
                  </BookingAccordionItem>
                ))}
              </BookingAccordion>
            )}

            {link && (
              <div>
                <CMSLink
                  {...link}
                  className={cn(
                    'inline-flex items-center justify-center text-lg px-6 py-3 rounded-md',
                    buttonClasses,
                  )}
                />
              </div>
            )}
          </div>
        </div>

        {ending && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 md:justify-between md:items-stretch pt-16">
            <div className="flex-1">
              {ending.title && (
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900">
                  {ending.title}
                </h3>
              )}
            </div>
            <div className="flex gap-2 items-stretch flex-wrap ">
              {ending.email && (
                <Link
                  href={`mailto:${ending.email}`}
                  className="text-lg font-medium text-white bg-teal-600 p-4 md:p-8 lg:p-12 flex flex-col justify-center "
                >
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">
                    Chat with us
                  </h3>
                  {ending.email}
                </Link>
              )}
              {ending.phone && (
                <Link
                  href={`tel:${ending.phone}`}
                  className="text-lg font-medium text-white bg-teal-600 p-4 md:p-8 lg:p-12 flex flex-col justify-center "
                >
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">Call us</h3>{' '}
                  {ending.phone}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
