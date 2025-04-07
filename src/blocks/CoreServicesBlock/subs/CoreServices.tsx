'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

import type { CoreServicesBlock as CoreServicesBlockType } from '@/payload-types'

type Props = CoreServicesBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const CoreServices: React.FC<Props> = (props) => {
  const {
    title,
    titleClasses,
    description,
    descriptionClasses,
    services,
    serviceHeadingClasses,
    serviceTextClasses,
    serviceLinkClasses,
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
  const handlePrevService = () => {
    const currentIndex = parseInt(activeTab)
    const newIndex = currentIndex === 0 ? (services?.length ?? 0) - 1 : currentIndex - 1
    setDirection('left')
    setPreviousTab(activeTab)
    setActiveTab(newIndex.toString())
  }

  const handleNextService = () => {
    const currentIndex = parseInt(activeTab)
    const newIndex = currentIndex === (services?.length ?? 0) - 1 ? 0 : currentIndex + 1
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
              'text-3xl md:text-4xl font-bold mb-4',
              titleClasses ? [...titleClasses] : [],
            )}
          >
            {title}
          </h2>
        )}

        {description && (
          <p
            className={cn(
              'text-lg mb-10 max-w-3xl',
              descriptionClasses ? [...descriptionClasses] : [],
            )}
          >
            {description}
          </p>
        )}

        <Tabs defaultValue="0" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
            <div className="w-full md:w-1/3">
              <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-2">
                {services &&
                  services.length > 0 &&
                  services.map((service, index) => (
                    <TabsTrigger
                      key={index}
                      value={index.toString()}
                      className={cn(
                        'w-full text-left py-8 px-6 rounded-md transition-all text-xl text-wrap lg:text-2xl',
                        'data-[state=active]:bg-finlandia-500 data-[state=active]:text-primary-foreground',
                        'data-[state=inactive]:hidden data-[state=inactive]:md:block hover:bg-background/40',
                      )}
                    >
                      {service.heading}
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
                    onClick={handlePrevService}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="text-sm font-medium">
                    {parseInt(activeTab) + 1} / {services?.length ?? 0}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextService}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <AnimatePresence mode="wait">
                {services &&
                  services.length > 0 &&
                  services.map(
                    (service, index) =>
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
                            <div
                              className={cn('flex flex-col md:flex-col-reverse gap-8 p-6 lg:p-12')}
                            >
                              <div className="w-full space-y-4">
                                <h3
                                  className={cn(
                                    'text-2xl font-semibold mb-4',
                                    serviceHeadingClasses ? [...serviceHeadingClasses] : [],
                                  )}
                                >
                                  {service.heading}
                                </h3>

                                <p
                                  className={cn(
                                    'mb-6',
                                    serviceTextClasses ? [...serviceTextClasses] : [],
                                  )}
                                >
                                  {service.description}
                                </p>

                                {service.link && (
                                  <CMSLink
                                    {...service.link}
                                    className={cn(
                                      'inline-block',
                                      serviceLinkClasses ? [...serviceLinkClasses] : [],
                                    )}
                                  />
                                )}
                              </div>

                              <div className="w-full lg:w-[80%] xl:w-[70%]">
                                {service.media?.media && (
                                  <div className="h-full">
                                    <Media
                                      resource={service.media.media}
                                      imgClassName="w-full h-full object-cover rounded-md"
                                    />
                                  </div>
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
