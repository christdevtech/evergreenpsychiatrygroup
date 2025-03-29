'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

import type { ServiceTabsBlock as ServiceTabsBlockType } from '@/payload-types'

type Props = ServiceTabsBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const ServiceTabs: React.FC<Props> = (props) => {
  const {
    title,
    titleClasses,
    services,
    serviceHeadingClasses,
    serviceTextClasses,
    serviceLinkClasses,
    tabButtonClasses,
    buttonBGColor,
    className,
    disableInnerContainer = false,
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
    hiddenLeft: { x: '-30%', opacity: 0 },
    hiddenRight: { x: '30%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className={cn(className)}>
      <div className={cn('container mx-auto', { 'px-4 md:px-6': !disableInnerContainer })}>
        <Tabs defaultValue="0" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Side: Service Tabs */}
            <div className="md:col-span-1 md:bg-teal-700">
              <div className="flex flex-col items-center md:items-start p-4 lg:p-8 md:bg-cyan-300">
                {title && (
                  <h2
                    className={cn(
                      'text-3xl md:text-4xl font-bold',
                      titleClasses ? [...titleClasses] : [],
                    )}
                  >
                    {title}
                  </h2>
                )}
              </div>
              <TabsList className="hidden md:flex flex-col items-start w-full h-auto bg-teal-700 p-4 lg:p-8 space-y-6">
                {services &&
                  services.length > 0 &&
                  services.map((service, index) => (
                    <TabsTrigger
                      key={index}
                      value={index.toString()}
                      className={cn(
                        tabButtonClasses ? [...tabButtonClasses] : [],
                        'data-[state=active]:text-slate-900 data-[state=active]:bg-white text-wrap',
                        `data-[state=active]:${buttonBGColor || 'bg-white'}`,
                        'data-[state=inactive]:hidden data-[state=inactive]:md:block',
                      )}
                    >
                      {service.heading}
                    </TabsTrigger>
                  ))}
              </TabsList>
            </div>

            {/* Right Side: Service Content */}
            <div className="md:col-span-2 overflow-hidden relative">
              {isMobile && (
                <div className="flex items-center justify-between mb-6">
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
                            <div className="flex flex-col items-center md:items-start space-y-8 py-8">
                              {/* Media/Image */}
                              <div className="w-1/2 md:w-2/3 lg:w-1/2">
                                {service.media?.media && (
                                  <div className="relative w-full">
                                    <Media
                                      resource={service.media.media}
                                      imgClassName="w-full h-full object-cover object-center rounded-xl"
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="space-y-4">
                                <h3
                                  className={cn(
                                    'text-2xl font-semibold',
                                    serviceHeadingClasses ? [...serviceHeadingClasses] : [],
                                  )}
                                >
                                  {service.heading}
                                </h3>

                                <p
                                  className={cn(
                                    'text-base',
                                    serviceTextClasses ? [...serviceTextClasses] : [],
                                  )}
                                >
                                  {service.description}
                                </p>

                                {service.links && (
                                  <div className="mt-6 flex justify-center md:justify-start flex-wrap gap-4">
                                    {service.links.map((link, i) => (
                                      <CMSLink
                                        key={i}
                                        {...link.link}
                                        className={cn(
                                          'inline-block',
                                          serviceLinkClasses ? [...serviceLinkClasses] : [],
                                        )}
                                      />
                                    ))}
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
