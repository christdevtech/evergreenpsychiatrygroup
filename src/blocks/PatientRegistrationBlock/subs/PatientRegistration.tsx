'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import RichText from '@/components/RichText'

import type { PatientRegistrationBlock as PatientRegistrationBlockType } from '@/payload-types'

type Props = PatientRegistrationBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const PatientRegistration: React.FC<Props> = (props) => {
  const {
    title,
    titleClasses,
    subtitle,
    subtitleClasses,
    patientOptions,
    optionTitleClasses,
    optionContentClasses,
    optionLinkClasses,
    className,
    disableInnerContainer = false,
    padding,
  } = props

  const [activeTab, setActiveTab] = useState<string>('0')
  const [previousTab, setPreviousTab] = useState<string>('0')
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Handle tab change with direction detection
  const handleTabChange = (value: string) => {
    setPreviousTab(activeTab)
    const newIndex = parseInt(value)
    const oldIndex = parseInt(activeTab)

    // Determine direction based on tab indices
    if (newIndex > oldIndex) {
      setDirection('right')
    } else {
      setDirection('left')
    }

    setActiveTab(value)
  }

  // Handle mobile navigation
  const handlePrevOption = () => {
    const currentIndex = parseInt(activeTab)
    const newIndex = currentIndex === 0 ? (patientOptions?.length ?? 0) - 1 : currentIndex - 1
    setDirection('left')
    setPreviousTab(activeTab)
    setActiveTab(newIndex.toString())
  }

  const handleNextOption = () => {
    const currentIndex = parseInt(activeTab)
    const newIndex = currentIndex === (patientOptions?.length ?? 0) - 1 ? 0 : currentIndex + 1
    setDirection('right')
    setPreviousTab(activeTab)
    setActiveTab(newIndex.toString())
  }

  // Animation variants
  const slideVariants = {
    hiddenLeft: { x: '-100%', opacity: 0 },
    hiddenRight: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className={cn(padding, className)}>
      <div className={cn('container mx-auto', { 'px-4 md:px-6': !disableInnerContainer })}>
        {title && (
          <h2
            className={cn(
              'text-3xl md:text-4xl font-bold text-center mb-4',
              titleClasses ? [...titleClasses] : [],
            )}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p
            className={cn(
              'text-lg text-center mb-10 max-w-3xl mx-auto',
              subtitleClasses ? [...subtitleClasses] : [],
            )}
          >
            {subtitle}
          </p>
        )}

        <Tabs defaultValue="0" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
            <div className="w-full md:w-1/3">
              <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-2">
                {patientOptions &&
                  patientOptions.length > 0 &&
                  patientOptions.map((option, index) => (
                    <TabsTrigger
                      key={index}
                      value={index.toString()}
                      className={cn(
                        'w-full text-center py-8 px-6 rounded-md transition-all text-xl text-wrap lg:text-2xl',
                        'data-[state=active]:font-bold',
                        'data-[state=inactive]:hidden data-[state=inactive]:md:block',
                      )}
                    >
                      {option.title}
                    </TabsTrigger>
                  ))}
              </TabsList>
            </div>

            <div className="w-full md:w-2/3 overflow-hidden md:border-l border-border">
              {isMobile && (
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevOption}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="text-sm font-medium">
                    {parseInt(activeTab) + 1} / {patientOptions?.length ?? 0}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextOption}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <AnimatePresence mode="wait">
                {patientOptions &&
                  patientOptions.length > 0 &&
                  patientOptions.map(
                    (option, index) =>
                      activeTab === index.toString() && (
                        <motion.div
                          key={index}
                          initial={direction === 'left' ? 'hiddenLeft' : 'hiddenRight'}
                          animate="visible"
                          exit="exit"
                          variants={slideVariants}
                          className="w-full"
                        >
                          <TabsContent
                            value={index.toString()}
                            className="mt-0 data-[state=active]:block"
                            forceMount
                          >
                            <div className={cn('flex flex-col gap-8 p-6 lg:p-12')}>
                              <div className="w-24 lg:w-32 xl:w-40">
                                {option.media?.media && (
                                  <div className="h-full mb-6">
                                    <Media
                                      resource={option.media.media}
                                      imgClassName="w-full h-full object-cover rounded-md"
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="w-full space-y-4">
                                {option.content && (
                                  <div
                                    className={cn(
                                      'mb-6',
                                      optionContentClasses ? [...optionContentClasses] : [],
                                    )}
                                  >
                                    <RichText
                                      data={option.content}
                                      enableProse={false}
                                      enableGutter={false}
                                    />
                                  </div>
                                )}

                                {option.link && (
                                  <CMSLink
                                    {...option.link}
                                    className={cn(
                                      'inline-block',
                                      optionLinkClasses ? [...optionLinkClasses] : [],
                                    )}
                                  ></CMSLink>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                        </motion.div>
                      ),
                  )}
              </AnimatePresence>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
